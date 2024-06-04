import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {CarRepository} from './car.repository';
import { Car } from './car.model';
import {CarCreateDto} from "./dto/car.create.dto";
import {CarFindOptionsDto} from "./dto/car.find.options.dto";
import {CarUpdateLocationDto} from "./dto/car.update.location.dto";
import {CarSearchByLocationDto} from "./dto/car.search.by.location.dto";

@Injectable()
export class CarService {
    constructor(
        private carRepository: CarRepository,
    ) {}

    async findAll(options?: CarFindOptionsDto): Promise<Car[]> {
        return this.carRepository.findAll(options);
    }

    async findOne(options: CarFindOptionsDto): Promise<Car> {
        return this.carRepository.findOne(options);
    }

    async create(createCarDto: CarCreateDto): Promise<Car> {
        return this.carRepository.create({
            ...createCarDto,
            id: uuidv4(),
            isRented: false
        });
    }

    async updateRentedStatus(id: string, status: boolean): Promise<void> {
        await this.carRepository.updateById(id, {isRented: status});
    }

    async delete(id: string): Promise<void> {
        await this.carRepository.delete(id);
    }

    async updateLocation(id: string, data: CarUpdateLocationDto): Promise<Car> {
        const { latitude, longitude } = data;
        await this.carRepository.updateById(id, {latitude, longitude});
        return this.carRepository.findOne({id});
    }

    async findByLocation(data: CarSearchByLocationDto): Promise<Car[]> {
        return this.carRepository.findByLocation(data);
    }
}