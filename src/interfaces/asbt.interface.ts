import { RecordStatuses } from 'enums/record-statuses.enum';
import { AccessRoles } from 'enums/roles.enum';

export interface AsbtCreateRequest {
  id?: string;
  status?: RecordStatuses;
  pinpp?: string; //pinfl
  doctype?: any;
  serialNumber: string;
  accesRoles?: AccessRoles[];
  login?: string;
  password?: string;
  dateFrom: Date;
  dateTill: Date;
}

export interface AsbtCreateResponse {
  AnswereId: number;
  AnswereMessage: string;
  AnswereComment: string;
}
