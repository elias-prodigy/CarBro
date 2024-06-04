import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import {FindUserOptions} from "./dto/user.find.options.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(options?: FindUserOptions): Promise<User[]> {
        try {
            return this.userRepository.find({where: options});
        } catch (e) {
            throw new Error(`Failed to find all users: ${e}`);
        }
    }

    async findOne(options: FindUserOptions): Promise<User> {
        try {
            return this.userRepository.findOne({
                where: options,
                relations: ['rentals']
            });
        } catch (e) {
            throw new Error(`Failed to find user: ${e}`);
        }
    }

    async create(user: Partial<User>): Promise<User> {
        try {
            const newUser = this.userRepository.create(user);
            return this.save(newUser);
        } catch (e) {
            throw new Error(`Failed to create user: ${e}`);
        }
    }

    async save(user: User): Promise<User> {
        try {
            return this.userRepository.save(user);
        } catch (e) {
            throw new Error(`Failed to save user: ${e}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.userRepository.softDelete(id);
        } catch (e) {
            throw new Error(`Failed to delete user: ${e}`);
        }
    }
}
