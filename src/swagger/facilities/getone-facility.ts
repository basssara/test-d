import { FindFacilityResponse, FindRegionResponse } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

// export class GetAllRegionRequestSwagger implements CreateRegionRequest { }

export class GetOneFacilityResponseSwagger implements FindFacilityResponse {
    @ApiProperty({
        example: '2a55ddc0-521c-4205-85c2-952755a3f293',

    })
    id: string;

    @ApiProperty({
        example: 'Nimadir',
    })
    facilityName: string;

    @ApiProperty({
        example: {
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
    })
    users: any;
}
