import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Rental} from "./rental.model";
import {User} from "../user/user.model";
import {Car} from "../car/car.model";

export interface findRentalOptions {
    id?: string,
    user?: User,
    car?: Car,
    startDate?: Date,
    endDate?: Date
}

@Injectable()
export class RentalRepository {
    constructor(
        @InjectRepository(Rental)
        private rentalRepository: Repository<Rental>,
    ) {}

    async findAll(options?: findRentalOptions): Promise<Rental[]> {
        return this.rentalRepository.find({
            where: options,
            relations: ['user', 'car']
        });
    }

    async findOne(options: findRentalOptions): Promise<Rental> {
        return this.rentalRepository.findOne({
            where: options,
            relations: ['user', 'car']
        });
    }

    async create(rental: Partial<Rental>): Promise<Rental> {
        const newRental = this.rentalRepository.create(rental);
        return this.save(newRental);
    }

    async setEndDate(id: string, endDate: Date): Promise<Rental> {
        await this.rentalRepository.update({id}, {endDate});
        return this.findOne({id});
    }

    async save(rental: Rental): Promise<Rental> {
        return this.rentalRepository.save(rental);
    }

    async userRentalStatus(userId: string): Promise<boolean> {
        const userWithActiveRental = await this.rentalRepository.createQueryBuilder('rental')
            .leftJoinAndSelect('rental.user', 'users')
            .where('users.id = :userId', { userId })
            .andWhere('rental.endDate IS NULL')
            .getOne();
        return !!userWithActiveRental;
    }
}
