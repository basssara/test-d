import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDtoRequest {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
