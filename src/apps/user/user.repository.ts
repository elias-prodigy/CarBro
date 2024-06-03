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

    async findAll(options?: findUserOptions): Promise<User[]> {
        return this.userRepository.find({ where: options });
    }

    async findOne(options: findUserOptions): Promise<User> {
        return this.userRepository.findOne({
            where: options,
            relations: ['rentals']
        });
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.save(newUser);
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.softDelete(id);
    }
}
