import {IsDate, IsEnum, IsNotEmpty, IsString, IsUUID} from 'class-validator';
import {Role} from "../../auth/roles/roles.enum";

export class UserDto {
    @IsUUID()
    id: string;

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