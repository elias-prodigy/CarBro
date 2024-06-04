import { Role } from '../../auth/roles/roles.enum';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class FindUserOptions {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsOptional()
  email?: string;
}
