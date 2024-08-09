import { AsbResponseText } from '@enums';
import { AsbtCreateResponse } from '@interfaces';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AsbtAnswers } from 'enums/service-answer.enum';

export const asbtRepsone = (
  res: AsbtCreateResponse,
): Promise<AsbtCreateResponse> => {
  console.log(res);
  switch (res.AnswereId) {
    case AsbtAnswers.OK:
      return;
    case AsbtAnswers.SERVICE_ERROR:
      throw new InternalServerErrorException(AsbResponseText.SERVICE_ERROR);
    case AsbtAnswers.INFRORMATION_ERROR:
      throw new BadRequestException(AsbResponseText.INFRORMATION_ERROR);
    case AsbtAnswers.INFROMATION_NOT_FOUND:
      throw new NotFoundException(AsbResponseText.INFORMATION_NOT_FOUND);
    case AsbtAnswers.INFORMATION_FOUND:
      throw new ConflictException(AsbResponseText.INFORMATION_FOUND);
  }
};
