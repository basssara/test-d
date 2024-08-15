import { RecordStatuses } from "entities";

export interface DistrictsModel {
  id: string;
  districtName: string;
  regionId: string;
  facilityId: string;
}

export interface CreateDistrictRequest {
  id: string;
  districtName: string;
  regionId: string;
  facilityId: string;
}

export interface UpdateDistrictRequest {
  districtName: string;
  regionId: string;
  facilityId: string;
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
};

interface Facility {
  id: string;
  facilityName: string;
  user: User;
};

export interface FindDistrictResponse {
  id: string;
  districtName: string;
  facility: Facility;
};