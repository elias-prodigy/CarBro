import { IsNotEmpty } from 'class-validator';

export class CarCreateDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: number;
}
