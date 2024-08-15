import {
  RecordStatuses,
  RecordStatusesForDB,
} from 'enums/record-statuses.enum';

export const statusConvert = (status: string) => {
  switch (status) {
    case RecordStatusesForDB.ACTIVATION:
      return RecordStatuses.ACTIVATION;
    case RecordStatusesForDB.DELETE:
      return RecordStatuses.DELETE;
    case RecordStatusesForDB.EDIT:
      return RecordStatuses.EDIT;
  }
};
