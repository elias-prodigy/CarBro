import {IsBoolean, IsInt, IsOptional, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export class CarFindOptionsDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsBoolean()
    @IsOptional()
    @Transform((value) => value.value === 'true')
    isRented?: boolean;

    @IsString()
    @IsOptional()
    brand?: string;

    @IsString()
    @IsOptional()
    model?: string;

    @IsInt()
    @IsOptional()
    @Transform((value) => Number(value.value))
    year?: number;

    @IsString()
    @IsOptional()
    search?: string;
}
