import type { AsbtCreateRequest, CreateUserRequest } from '@interfaces';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RecordStatusesForDB } from 'enums/record-statuses.enum';

export class CreateUserRequestDto implements CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  login: string;
  password: string;
  role: string[];
}

export class CreateAsbtRequestDto
  implements Omit<AsbtCreateRequest, 'dateFrom'>
{
  @IsOptional()
  @IsEnum(RecordStatusesForDB)
  status?: RecordStatusesForDB;

  @IsOptional()
  @IsOptional()
  pinpp?: string;

  @IsOptional()
  doctype?: any;

  @IsOptional()
  @IsString()
  serialnumber: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accessRoles: string[];

  @IsOptional()
  @IsString()
  login?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsDate()
  dateTill: Date;
}
