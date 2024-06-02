import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { findUserOptions, UserRepository } from './user.repository';
import { User } from './user.model';
import { CreateUserDto } from "./dto/create.user.dto";
import { Role } from "../auth/roles/roles.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findOneBy(options: findUserOptions): Promise<User> {
        return this.userRepository.findOneBy(options);
    }

    async create(createUserDto: CreateUserDto, role: Role): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.userRepository.create({
            ...createUserDto,
            id: uuidv4(),
            password: hashedPassword,
            role
        });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
