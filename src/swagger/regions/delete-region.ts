import { ApiProperty } from '@nestjs/swagger';

// export class GetAllRegionRequestSwagger implements CreateRegionRequest { }

export class DeleteRegionResponseSwagger {
    @ApiProperty({
        example: 'ok',

    })
    result: string;

}
