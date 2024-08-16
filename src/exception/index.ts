import { HttpStatus } from '@enums';

interface ExceptionParams {
  status: HttpStatus;
  message: string;
  details?: unknown;
  exception?: string;
}

export class Exception extends Error {
  private status: HttpStatus;
  private details?: unknown;
  private exception?: string;

  constructor(params: ExceptionParams) {
    super(params.message);
    this.status = params.status;
    this.details = params.details;
    this.exception = params.exception;

    // Set the prototype explicitly, as extending built-in classes in ES5 might not work correctly in some environments.
    Object.setPrototypeOf(this, new.target.prototype);

    // Optional: Attach a name to the error for identification
    this.name = this.constructor.name;
  }

  getStatus(): HttpStatus {
    return this.status;
  }

  getDetails(): unknown {
    return this.details;
  }

  getException(): string | undefined {
    return this.exception;
  }
}

// Example usage:
try {
  throw new Exception({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred',
    details: { additionalInfo: 'Some more details' },
    exception: 'InternalServerErrorException',
  });
} catch (error) {
  if (error instanceof Exception) {
    console.error(`Status: ${error.getStatus()}`);
    console.error(`Message: ${error.message}`);
    console.error(`Details: ${JSON.stringify(error.getDetails())}`);
    console.error(`Exception: ${error.getException()}`);
  } else {
    console.error(error);
  }
}
