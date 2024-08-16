import { RecordStatuses } from 'entities';

export interface UserModel {
  guid?: string;
  status?: RecordStatuses;
  pinpp?: string;
  doctype?: number;
  serialNumber: string;
  roles?: string[];
  login?: string;
  password?: string;
  dateFrom: Date;
  dateTill: Date;
}

export interface CreateUserRequest {
  guid?: string;
  status: RecordStatuses;
  pinpp: string;
  doctype: number;
  serialNumber: string;
  accessRoles: string[];
  login: string;
  password: string;
  facilityId: string;
  dateFrom?: Date;
  dateTill?: Date;
}

export interface GetUserRequest {
  login: string;
}

export interface GetUserResponse {
  id: string;
  login: string;
  password: string;
  role: string[];
}

export interface UpdateUserRequest {
  guid?: string;
  status?: RecordStatuses;
  pinpp?: string;
  doctype?: number;
  serialNumber?: string;
  accessRoles?: string[];
  login?: string;
  password?: string;
  facilityId?: string;
  dateFrom?: Date;
  dateTill?: Date;
}

export interface DeleteUserRequest {
  id: string;
}
