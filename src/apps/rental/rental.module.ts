import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { Rental } from './rental.model';
import { RentalRepository } from './rental.repository';
import { CarModule } from '../car/car.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), CarModule],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository],
  exports: [RentalService],
})
export class RentalModule {}
