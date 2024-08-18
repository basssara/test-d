import type { CreateUserRequest } from '@interfaces';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAsbtRequestDto implements CreateUserRequest {
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
