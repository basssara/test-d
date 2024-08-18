import { HttpStatus } from '../enums';
export interface ExceptionParams {
  status: HttpStatus;
  message: string;
  details?: unknown;
  exception?: string;
}
