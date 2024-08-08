import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    private answereId: string,
    private answereMessage: string,
    private answereComment: string,
  ) {
    super(
      {
        answereId: answereId,
        answereMessage: answereMessage,
        answereComment: answereComment,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
