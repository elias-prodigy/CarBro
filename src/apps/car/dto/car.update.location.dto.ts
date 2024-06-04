import { IsDecimal } from 'class-validator';

export class CarUpdateLocationDto {
  @IsDecimal()
  latitude: number;

  @IsDecimal()
  longitude: number;
}
