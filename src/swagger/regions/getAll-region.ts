import { FindRegionResponse } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

// export class GetAllRegionRequestSwagger implements CreateRegionRequest { }

export class GetAllRegionResponseSwagger implements FindRegionResponse {
    @ApiProperty({
        example: '2a55ddc0-521c-4205-85c2-952755a3f293',

    })
    id: string;

    @ApiProperty({
        example: 'Toshkent shahar',
    })
    regionName: string;

    @ApiProperty({
        example: {
            "id": "e7deecdb-9b17-48d8-a6bb-33df6d1fcb2d",
            "districtName": "Qumariq tumani",
            "facility": {
                "id": "db3204a3-bccb-4358-998b-4d397ae162e1",
                "facilityName": "Nimadirda",
                "user": {
                    "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
                    "status": "activation",
                    "pinpp": "12345678901234",
                    "serialNumber": "SN1234567890",
                    "roles": [
                        "admin",
                        "user"
                    ],
                    "login": "user1",
                    "password": "password1",
                    "dateFrom": "2024-08-15T06:13:23.952Z",
                    "dateTill": "2024-12-31T18:59:59.000Z"
                }
            }
        }
    })
    districts: any;
}
