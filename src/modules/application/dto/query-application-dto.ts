// import { SendApplicationRequest } from '@interfaces';
import { QueryApplication } from '@interfaces';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';

export class QueryApplicationDTO implements QueryApplication {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number;

    @IsOptional()
    @IsUUID()
    regionId?: string;

    @IsOptional()
    @IsUUID()
    districtId?: string;

    @IsOptional()
    @IsUUID()
    facilityId?: string;

    @IsOptional()
    @IsString()
    status?: string;
}
