import type { FindServiceRequest } from '@interfaces';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindServiceRequestDto implements FindServiceRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
