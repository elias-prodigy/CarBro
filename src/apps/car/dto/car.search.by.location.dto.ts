import { IsDecimal, IsInt, IsOptional } from 'class-validator';

export class CarSearchByLocationDto {
  @IsDecimal()
  latitude: number;

  @IsDecimal()
  longitude: number;

  @IsInt()
  @IsOptional()
  radius?: number;
}
