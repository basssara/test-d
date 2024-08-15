import { UpdateFacilityRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateFacilityDTO implements UpdateFacilityRequest {
  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  regionId: string;
}
