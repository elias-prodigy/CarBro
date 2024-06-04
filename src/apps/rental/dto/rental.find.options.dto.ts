import { IsOptional, IsUUID } from 'class-validator';

export class RentalFindOptionsDto {
  @IsUUID()
  @IsOptional()
  id?: string;
}
