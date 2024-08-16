import type { UpdateUserRequest } from '@interfaces';
import { RecordStatuses } from 'entities';

export class UpdateUserDto implements UpdateUserRequest {
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
