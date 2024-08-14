import { FindRegionRequest } from '@interfaces';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindRegionRequestDto implements FindRegionRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
