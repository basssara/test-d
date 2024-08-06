import type { CreateServiceRequest } from '@interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceRequestDto
  implements Omit<CreateServiceRequest, 'userId'>
{
  @IsString()
  @IsNotEmpty()
  serviceName: string;
}
