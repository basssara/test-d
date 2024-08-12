import { SendApplicationRequest } from '@interfaces';
import { IsNotEmpty, IsString, IsUUID, } from 'class-validator';

export class createApplicationDTO implements SendApplicationRequest {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    serviceId: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    pinfl: string;
};