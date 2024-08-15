import { GetPhotoRequest } from '@interfaces';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetPhotoRequestDto implements GetPhotoRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
