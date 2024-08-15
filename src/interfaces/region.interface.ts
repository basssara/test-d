import { RecordStatuses } from 'entities';

export interface RegionModel {
  id: string;
  regionName: string;
  userId: string;
}

export interface CreateRegionRequest {
  regionName: string;
}

export interface UpdateRegionRequest {
  regionName: string;
}

export interface FindRegionRequest {
  id: string;
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

interface Facility {
  id: string;
  facilityName: string;
  user: User;
}

interface Districts {
  id: string;
  districtName: string;
  facility: Facility;
}

export interface FindRegionResponse {
  id: string;
  regionName: string;
  districts: Districts[];
}