import { GetPersonalDataWithPinflRequest } from '@interfaces';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GetPersonalDataWithPinflRequestDto
  implements GetPersonalDataWithPinflRequest
{
  @IsString()
  @IsNotEmpty()
  pinpp: number;

  @IsBoolean()
  @IsNotEmpty()
  address: boolean;

  @IsBoolean()
  @IsNotEmpty()
  parrents: boolean;
}
