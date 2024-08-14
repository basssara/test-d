import { UpdateFacilityRequest } from '@interfaces';

export class UpdateFacilityDTO implements UpdateFacilityRequest {
  serviceName: string;

  userId: string;

  regionId: string;
}
