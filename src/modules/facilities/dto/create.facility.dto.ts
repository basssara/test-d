import { CreateFacilityRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFacilityDTO implements CreateFacilityRequest {
  @IsString()
  @IsNotEmpty()
  facilityName: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  regionId: string;
}
