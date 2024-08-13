import type { Request } from 'express';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isJWT } from 'class-validator';
import { Roles, ErrorCodes } from '@enums';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'entities';
import { Repository } from 'typeorm';
import { verifyJwt } from 'helpers';
import { ROLES_KEY } from 'decorators';
import { jwtConstants } from 'constans';

@Injectable()
export class CheckPermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request.headers.authorization?.replace(
      /^(bearer)\s/i,
      '',
    );

    if (!accessToken || !isJWT(accessToken)) {
      throw new UnauthorizedException(ErrorCodes.ACCESS_TOKEN_NOT_VALID);
    }

    const verified = verifyJwt(accessToken, jwtConstants.secret);

    const user = await this.usersRepository.findOne({
      where: { login: verified.login },
    });

    if (!user) {
      throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    }

    if (!requiredRoles.some((role) => user.accessRoles?.includes(role))) {
      throw new UnauthorizedException(ErrorCodes.PERMISSION_DENIED);
    }

    return true;
  }
}
