import { UpdateDistrictRequest } from '@interfaces';

export class UpdateDistrictDTO implements UpdateDistrictRequest {
  districtName: string;

  regionId: string;

  facilityId: string;
}
