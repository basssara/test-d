import { LoginRequest, LoginResponse } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestSwagger implements LoginRequest {
  @ApiProperty({
    example: 'john2281',
  })
  login: string;

  @ApiProperty({
    example: 'john2weq22s281',
  })
  password: string;
}

export class LoginResponseSwagger implements Omit<LoginResponse, 'id'> {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpvaG4ifQ',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpvaG4ifQ',
  })
  refreshToken: string;
}
