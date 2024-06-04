import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.model';
import { RentalFindOptionsDto } from './dto/rental.find.options.dto';

@Injectable()
export class RentalRepository {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async findOne(options: RentalFindOptionsDto): Promise<Rental> {
    try {
      return this.rentalRepository.findOne({
        where: options,
        relations: ['user', 'car'],
      });
    } catch (e) {
      throw new Error(`Failed to find rental: ${e}`);
    }
  }

  async create(rental: Partial<Rental>): Promise<Rental> {
    try {
      const newRental = this.rentalRepository.create(rental);
      return this.save(newRental);
    } catch (e) {
      throw new Error(`Failed to create rental: ${e}`);
    }
  }

  async setEndDate(id: string, endDate: Date): Promise<Rental> {
    try {
      await this.rentalRepository.update({ id }, { endDate });
      return this.findOne({ id });
    } catch (e) {
      throw new Error(`Failed to rental end date: ${e}`);
    }
  }

  async save(rental: Rental): Promise<Rental> {
    try {
      return this.rentalRepository.save(rental);
    } catch (e) {
      throw new Error(`Failed to save rental: ${e}`);
    }
  }

  async userRentalStatus(userId: string): Promise<boolean> {
    try {
      const userWithActiveRental = await this.rentalRepository
        .createQueryBuilder('rental')
        .leftJoinAndSelect('rental.user', 'users')
        .where('users.id = :userId', { userId })
        .andWhere('rental.endDate IS NULL')
        .getOne();
      return !!userWithActiveRental;
    } catch (e) {
      throw new Error(`Failed get user rentals: ${e}`);
    }
  }
}
