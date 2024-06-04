import {Injectable} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {RentalRepository} from './rental.repository';
import {Rental} from "./rental.model";
import {CarService} from "../car/car.service";
import {UserDto} from "../user/dto/user.dto";

@Injectable()
export class RentalService {
    constructor(
        private rentalRepository: RentalRepository,
        private carService: CarService,
    ) {}

    async rentCar(user: UserDto, carId: string): Promise<Rental> {
        const activeRental = await this.rentalRepository.userRentalStatus(user.id);
        if (activeRental) throw new Error('User is already renting a car');

        const car = await this.carService.findOne({id: carId});
        if (!car) throw new Error('Car not found');
        if (car.isRented) throw new Error('Car is already rented');

        const rental = this.rentalRepository.create({
            id: uuidv4(),
            user,
            car,
            startDate: new Date()
        });

        await this.carService.updateRentedStatus(car.id, true)

        return rental;
    }

    async returnCar(rentalId: string): Promise<Rental> {
        const rental = await this.rentalRepository.findOne({id: rentalId});
        if (!rental) throw new Error('Rental not found');
        if (rental.endDate) throw new Error('Car is already returned');

        const rentalUpdated = await this.rentalRepository.setEndDate(rental.id, new Date());
        await this.carService.updateRentedStatus(rental.car.id, false);

        return rentalUpdated;
    }
}