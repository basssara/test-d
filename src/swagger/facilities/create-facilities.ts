import { CreateFacilityRequest } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityRequestSwagger implements CreateFacilityRequest {
    @ApiProperty({
        example: 'Nimadirda',
    })
    serviceName: string;

    @ApiProperty({
        example: 'db3204a3-bccb-4358-998b-4d397ae162e1',
    })
    userId: string;

    @ApiProperty({
        example: 'db3204a3-bccb-4358-998b-4d397ae162e2',
    })
    regionId: string;
};

// export class CreateFacilityResponseSwagger implements CreateRegionRequest {
//     @ApiProperty({
//         example: '2a55ddc0-521c-4205-85c2-952755a3f293',
//     })
//     id: string;

//     @ApiProperty({
//         example: 'Toshkent shahar',
//     })
//     regionName: string;

//     @ApiProperty({
//         example: '2024-08-09T06:24:46.812Z',
//     })
//     createdAt: Date;
// }
