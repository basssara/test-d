import { CreateDistrictRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDistrictDTO implements CreateDistrictRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  districtName: string;

  @IsNotEmpty()
  @IsUUID()
  regionId: string;

  @IsNotEmpty()
  @IsUUID()
  facilityId: string;
}
