import {IsDate, IsEnum, IsInt, IsNotEmpty, IsString} from 'class-validator';
import {Role} from "../../auth/roles/roles.enum";

export class UserDto {
    @IsInt()
    id: number;

    @IsString()
    firstname: string;

    @IsString()
    lastname: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role: Role;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsDate()
    deletedAt: Date;
}