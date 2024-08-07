import type { CreateUserRequest } from '@interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  login: string;
  password: string;
  role: string[];
}
