import type { UpdateServiceRequest } from '@interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceRequestDto
  implements Omit<UpdateServiceRequest, 'id'>
{
  @IsString()
  @IsNotEmpty()
  serviceName: string;
}
