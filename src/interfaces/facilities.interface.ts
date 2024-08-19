import { RecordStatuses } from "entities";

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

interface User {
  id: string;
  status: RecordStatuses;
  pinpp: string;
  serialNumber: string;
  roles: string[];
  login: string;
  password: string;
  dateFrom: Date;
  dateTill: Date;
}


export interface FindFacilityResponse {
  id: string;
  facilityName: string;
  users: User
}