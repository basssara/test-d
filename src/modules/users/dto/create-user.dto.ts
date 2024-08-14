import type { AsbtCreateRequest } from '@interfaces';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordStatusesForDB } from 'enums/record-statuses.enum';

export class CreateAsbtRequestDto implements AsbtCreateRequest {
  @IsEnum(RecordStatusesForDB)
  @IsNotEmpty()
  status: RecordStatusesForDB;

  @IsOptional()
  @IsNotEmpty()
  pinpp: string;

  @IsNotEmpty()
  doctype: any;

  @IsString()
  @IsNotEmpty()
  serialnumber: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  accessRoles: string[];

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  facilityId: string;

  @IsNotEmpty()
  @IsDateString()
  dateTill: Date;

  @IsNotEmpty()
  @IsDateString()
  dateFrom: Date;
}
