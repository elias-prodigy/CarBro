import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { Role } from "../auth/roles/roles.enum";

export interface findUserOptions {
    id?: string,
    role?: Role,
    email?: string
}

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneBy(options: findUserOptions): Promise<User> {
        return this.userRepository.findOneBy(options);
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}
