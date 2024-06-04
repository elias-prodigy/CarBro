import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from '../../auth/roles/roles.enum';
import { Rental } from '../../rental/rental.model';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsArray()
  rentals: Rental[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  deletedAt: Date;
}
