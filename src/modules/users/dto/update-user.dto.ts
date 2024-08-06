import { UpdateUserRequest } from 'interfaces/user.interface';

export class UpdateUserDto implements UpdateUserRequest {
  id: string;
  login: string;
  password: string;
  role: string[];
}
