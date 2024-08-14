import { CreateRegionRequest } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionRequestSwagger implements CreateRegionRequest {
  @ApiProperty({
    example: 'Toshkent shahar',
  })
  regionName: string;
}

export class CreateRegionResponseSwagger implements CreateRegionRequest {
  @ApiProperty({
    example: '2a55ddc0-521c-4205-85c2-952755a3f293',
  })
  id: string;

  @ApiProperty({
    example: 'Toshkent shahar',
  })
  regionName: string;

  @ApiProperty({
    example: '2024-08-09T06:24:46.812Z',
  })
  createdAt: Date;
}
