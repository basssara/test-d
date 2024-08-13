import { UpdateDistrictRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID, } from 'class-validator';

export class UpdateDistrictDTO implements UpdateDistrictRequest {

    districtName: string;

    regionId: string;

    facilityId: string;
};