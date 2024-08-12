export interface FacilitiesModel {
  id: string;
  serviceName: string;
  userId: string;
  regionId: string;
}

export interface CreateFacilityRequest {
  serviceName: string;
  userId: string;
  regionId: string;
}

export interface UpdateFacilityRequest {
  serviceName: string;
  userId: string;
  regionId: string;
}