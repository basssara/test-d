import type { CreateUserRequest } from '@interfaces';

export class CreateUserRequestDto implements CreateUserRequest {
  login: string;
  password: string;
  role: string[];
}
