import { RecordStatusesForDB } from 'enums/record-statuses.enum';

export interface AsbtCreateRequest {
  id?: string;
  status?: RecordStatusesForDB;
  pinpp?: string; //pinfl
  doctype?: any;
  serialNumber: string;
  accesRoles?: string[];
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
