import type { DeleteServiceRequest } from '@interfaces';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteServiceRequestDto implements DeleteServiceRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
