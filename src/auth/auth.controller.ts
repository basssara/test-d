import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoRequest } from './dto/login.dto';
import { LoginResponse } from '@interfaces';
import { Request } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ForbiddenResponse,
  InternalServerErrorResponse,
  LoginRequestSwagger,
  LoginResponseSwagger,
  UnauthorizedResponse,
  UnprocessableEntityResponse,
} from 'swagger';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginRequestSwagger,
  })
  @ApiResponse({
    type: LoginResponseSwagger,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    type: UnauthorizedResponse,
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    type: ForbiddenResponse,
    status: HttpStatus.FORBIDDEN,
  })
  @ApiResponse({
    type: UnprocessableEntityResponse,
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  @ApiResponse({
    type: InternalServerErrorResponse,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  async login(
    @Body() body: LoginDtoRequest,
    @Req() req: Request,
  ): Promise<Omit<LoginResponse, 'id'>> {
    const { accessToken, refreshToken, id } = await this.service.login(body);

    req.session.user = { id };

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
