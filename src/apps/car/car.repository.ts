import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from 'typeorm';
import { Car } from './car.model';
import {CarFindOptionsDto} from "./dto/car.find.options.dto";


@Injectable()
export class CarRepository {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
    ) {}

    private applyConditions(queryBuilder: SelectQueryBuilder<Car>, options?: CarFindOptionsDto): SelectQueryBuilder<Car> {
        if (options) {
            Object.keys(options).forEach(key => {
                const value = options[key];
                if (value !== undefined) {
                    if (key === 'search') {
                        queryBuilder.andWhere(`LOWER(car.brand) ILIKE LOWER(:search) OR LOWER(car.model) ILIKE LOWER(:search)`, { search: `%${value}%` });
                    } else if (typeof value === 'string') {
                        queryBuilder.andWhere(`LOWER(car.${key}) ILIKE LOWER(:${key})`, { [key]: `%${value}%` });
                    } else {
                        queryBuilder.andWhere(`car.${key} = :${key}`, { [key]: value });
                    }
                }
            });
        }
        return queryBuilder;
    }

    async findAll(options?: CarFindOptionsDto): Promise<Car[]> {
        const queryBuilder = this.carRepository.createQueryBuilder('car');
        this.applyConditions(queryBuilder, options);
        return queryBuilder.getMany();
    }

    async findOne(options: CarFindOptionsDto): Promise<Car> {
        return this.carRepository.findOne({where: options});
    }

    async create(car: Partial<Car>): Promise<Car> {
        const newCar = this.carRepository.create(car);
        return this.save(newCar);
    }

    async updateById(id: string, updates: Partial<Car>): Promise<void> {
        await this.carRepository.update({id}, updates);
    }


    async save(car: Car): Promise<Car> {
        return this.carRepository.save(car);
    }

    async delete(id: string): Promise<void> {
        await this.carRepository.softDelete(id);
    }

    async findByLocation({ latitude, longitude, radius = 5000 }): Promise<Car[]> {
        return this.carRepository
            .createQueryBuilder('car')
            .where(`ST_DWithin(
                ST_SetSRID(ST_Point(car.longitude, car.latitude), 4326)::geography,
                ST_SetSRID(ST_Point(:longitude, :latitude), 4326)::geography,
                :radius
            )`, { latitude, longitude, radius })
            .getMany();
    }
}