import {
  RecordStatuses,
  RecordStatusesForDB,
} from 'enums/record-statuses.enum';

export const StatusConvert = (status: string) => {
  switch (status) {
    case RecordStatusesForDB.ACTIVE_NEW:
      return RecordStatuses.ACTIVE_NEW;
    case RecordStatusesForDB.CANCELL:
      return RecordStatuses.CANCELL;
    case RecordStatusesForDB.EDIT:
      return RecordStatuses.EDIT;
  }
};
