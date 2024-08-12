import type { LoginRequest, LoginResponse } from '@interfaces';
import { UsersService } from '@modules';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'constanst';
import { signJwt } from 'helpers';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(data: LoginRequest): Promise<LoginResponse> {
    const user = await this.usersService.validate({ login: data.login });

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = signJwt(
      {
        id: user.id,
        login: user.login,
      },
      jwtConstants.secret,
      60 * 60,
    );

    const refreshToken = signJwt(
      {
        id: user.id,
        login: user.login,
      },
      jwtConstants.secret,
      60 * 60 * 30,
    );

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }

  async logout(): Promise<void> {}
}
