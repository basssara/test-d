import type { UpdateUserRequest } from '@interfaces';

export class UpdateUserDto implements UpdateUserRequest {
  id: string;
  login: string;
  password: string;
  role: string[];
}
