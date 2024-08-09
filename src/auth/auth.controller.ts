import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login.dto';
import { LoginResponse } from '@interfaces';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Auth');
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDtoRequest,
    @Req() req: Request,
  ): Promise<Omit<LoginResponse, 'sessionId'>> {
    const { accessToken, refreshToken, sessionId } =
      await this.service.login(body);

    req.session.user = { sessionId };

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
