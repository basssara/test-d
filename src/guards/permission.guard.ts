import type { Request } from 'express';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isJWT } from 'class-validator';
// import { PERMISSION } from 'constants/permission.constant';
import { ErrorCodes } from '@enums';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities';
import { Repository } from 'typeorm';
import { verifyJwt } from 'helpers';
import { jwtConstants } from 'constants/jwt.constant';

@Injectable()
export class CheckPermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const permissionName = this.reflector.get<string>(
    //   PERMISSION,
    //   context.getHandler(),
    // );

    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.headers.authorization?.replace(
      /^(bearer)\s/i,
      '',
    );

    if (!accessToken || !isJWT(accessToken)) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    }

    const verified = verifyJwt(accessToken, jwtConstants.secret);

    const user = await this.usersRepository.findOne({
      where: { login: verified.login },
    });

    if (!user) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    }

    if (!user.accessRoles.find((role: any) => role.name === 'admin')) {
      throw new ForbiddenException(ErrorCodes.PERMISSION_DENIED);
    }

    return true;
  }
}
