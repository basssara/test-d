import { CreateFacilityRequest } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityRequestSwagger implements CreateFacilityRequest {
    @ApiProperty({
        example: 'Nimadirda',
    })
    facilityName: string;

    @ApiProperty({
        example: 'db3204a3-bccb-4358-998b-4d397ae162e2',
    })
    regionId: string;
};

export class CreateFacilityResponseSwagger implements CreateFacilityRequest {
    @ApiProperty({
        example: 'Nimadirda',
    })
    facilityName: string;

    @ApiProperty({
        example: 'db3204a3-bccb-4358-998b-4d397ae162e2',
    })
    regionId: string;
}
