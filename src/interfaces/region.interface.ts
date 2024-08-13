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

export interface DeleteRegionRequest {
  id: string;
}