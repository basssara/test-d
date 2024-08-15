import { GetPersonalDataWithPassportRequest } from '@interfaces';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class GetPersonalDataWithPassportRequestDto
  implements GetPersonalDataWithPassportRequest
{
  @IsNumber()
  @IsNotEmpty()
  doctype: number;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsDate()
  @IsNotEmpty()
  dateBirth: Date;

  @IsBoolean()
  @IsNotEmpty()
  address: boolean;

  @IsBoolean()
  @IsNotEmpty()
  parrents: boolean;
}
