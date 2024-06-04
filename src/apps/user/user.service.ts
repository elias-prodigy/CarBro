import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserRepository } from './user.repository';
import { User } from './user.model';
import { UserCreateDto } from './dto/user.create.dto';
import { Role } from '../auth/roles/roles.enum';
import * as bcrypt from 'bcrypt';
import { FindUserOptions } from './dto/user.find.options.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(options?: FindUserOptions): Promise<User[]> {
    return this.userRepository.findAll(options);
  }

  async findOne(options: FindUserOptions): Promise<User> {
    return this.userRepository.findOne(options);
  }

  async create(createUserDto: UserCreateDto, role: Role): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userRepository.create({
      ...createUserDto,
      id: uuidv4(),
      password: hashedPassword,
      role,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
