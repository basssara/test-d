import { RecordStatusesForDB } from 'enums/record-statuses.enum';

export interface AsbtCreateRequest {
  guid?: string;
  status?: RecordStatusesForDB;
  pinpp?: string;
  doctype?: number;
  serialnumber: string;
  accessRoles?: string[];
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
