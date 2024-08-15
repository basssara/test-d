export interface FacilitiesModel {
  id: string;
  facilityName: string;
  userId: string;
  regionId: string;
}

export interface CreateFacilityRequest {
  facilityName: string;
  regionId: string;
}

export interface UpdateFacilityRequest {
  serviceName?: string;
  userId?: string;
  regionId?: string;
}
