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