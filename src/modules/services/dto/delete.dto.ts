import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteServiceRequestDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
