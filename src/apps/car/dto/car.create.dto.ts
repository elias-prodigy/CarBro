import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CarCreateDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsInt()
  @IsNotEmpty()
  year: number;
}
