import { CreateFacilityRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID, } from 'class-validator';

export class CreateFacilityDTO implements CreateFacilityRequest {
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    regionId: string;
};