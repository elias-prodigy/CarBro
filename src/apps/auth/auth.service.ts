import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { UserCreateDto } from '../user/dto/user.create.dto';
import { Role } from './roles/roles.enum';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    try {
      const payload = { email: user.email, id: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new Error(`Login failed: ${e}`);
    }
  }

  async register(createUserDto: UserCreateDto, role: Role): Promise<User> {
    return this.userService.create(createUserDto, role);
  }
}
