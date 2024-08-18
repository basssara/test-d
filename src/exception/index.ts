import { HttpStatus } from '../enums';
import type { ExceptionParams } from '../interfaces';
export declare class Exception extends Error {
  #private;
  constructor(params: ExceptionParams);
  getStatus(): HttpStatus;
  getMessage(): string;
  getDetails(): unknown;
  getException(): string;
}
