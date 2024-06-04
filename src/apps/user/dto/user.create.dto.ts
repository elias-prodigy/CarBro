import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
