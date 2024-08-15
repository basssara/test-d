import { GetPersonalDocumentRequest } from '@interfaces';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPersonalDocumentRequestDto
  implements GetPersonalDocumentRequest
{
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
