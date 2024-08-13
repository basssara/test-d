import { CreateRegionRequest } from '@interfaces';
import { IsNotEmpty, IsString, } from 'class-validator';

export class createRegionDto implements CreateRegionRequest {
    @IsString()
    @IsNotEmpty()
    regionName: string;
};