import { UpdateApplicationRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class updateApplicationDto implements UpdateApplicationRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  pinfl: string;
}
