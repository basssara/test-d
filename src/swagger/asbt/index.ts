import { AsbtCreateRequest } from '@interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { RecordStatuses } from 'entities';

export class AsbtCreateRequestSwagger
  implements Omit<AsbtCreateRequest, 'dateFrom'>
{
  @ApiProperty({
    enum: RecordStatuses,
  })
  status: RecordStatuses;

  @ApiProperty({
    type: 'string',
    example: '23456743456321',
  })
  pinpp: string; //pinfl

  @ApiProperty({
    type: 'integer',
  })
  doctype: number;

  @ApiProperty({
    type: 'string',
    example: 'AD2732821123287374623172',
  })
  serialnumber: string;

  @ApiProperty({
    example: ['admin'],
    type: 'array',
  })
  accessRoles: string[];

  @ApiProperty({
    type: 'string',
    example: 'lupin228',
  })
  login: string;

  @ApiProperty({
    type: 'string',
    example: 'lupin22812344212w22',
  })
  password: string;

  @ApiProperty({
    type: 'string',
    example: "'5f4dcc3b5aa765d61d8327deb882cf99',",
  })
  facilityId: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  dateTill: Date;
}

export interface AsbtCreateResponse {
  AnswereId: number;
  AnswereMessage: string;
  AnswereComment: string;
}
