import { AccessRoles } from 'enums/roles.enum';

export interface UserModel {
  id: string; //guid or uuid
  login: string;
  password: string;
  // uniqueId: string;
  // status?: string; //Record status
  // pinpp: string; //pinfl
  // doctype?: any; //
  // serialNumber: string;
  accesRoles?: AccessRoles[]; //in db
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreateUserRequest {
  login: string;
  password: string;
  role: string[];
}

export interface GetUserRequest {
  login: string;
}

export interface GetUserResponse {
  id: string;
  login: string;
  password: string;
  role: AccessRoles[];
}

export interface UpdateUserRequest {
  id: string;
  login: string;
  password: string;
  role: string[];
}

export interface DeleteUserRequest {
  id: string;
}
