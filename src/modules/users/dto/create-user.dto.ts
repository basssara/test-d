import type { CreateUserRequest } from '@interfaces';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordStatuses } from 'entities';
import { RecordStatusesForDB } from 'enums/record-statuses.enum';

export class CreateAsbtRequestDto implements CreateUserRequest {
  @IsEnum(RecordStatusesForDB)
  @IsNotEmpty()
  status: RecordStatuses;

  @IsOptional()
  @IsNotEmpty()
  pinpp: string;

  @IsNotEmpty()
  doctype: any;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

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
