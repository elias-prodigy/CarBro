import { MigrationInterface, QueryRunner } from 'typeorm';
import { Car } from '../apps/car/car.model';
import { v4 as uuidv4 } from 'uuid';

export class PopulateCars1717515391671 implements MigrationInterface {
  private carsData = [
    {
      id: uuidv4(),
      brand: 'Toyota',
      model: 'Camry',
      year: 2020,
      isRented: false,
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: uuidv4(),
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
      isRented: true,
      latitude: 34.0522,
      longitude: -118.2437,
    },
    {
      id: uuidv4(),
      brand: 'Ford',
      model: 'Mustang',
      year: 2021,
      isRented: false,
      latitude: 39.9526,
      longitude: -75.1652,
    },
    {
      id: uuidv4(),
      brand: 'Chevrolet',
      model: 'Silverado',
      year: 2018,
      isRented: true,
      latitude: 29.7604,
      longitude: -95.3698,
    },
    {
      id: uuidv4(),
      brand: 'BMW',
      model: 'X5',
      year: 2020,
      isRented: false,
      latitude: 47.6062,
      longitude: -122.3321,
    },
    {
      id: uuidv4(),
      brand: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2019,
      isRented: false,
      latitude: 41.8781,
      longitude: -87.6298,
    },
    {
      id: uuidv4(),
      brand: 'Audi',
      model: 'A4',
      year: 2021,
      isRented: true,
      latitude: 33.749,
      longitude: -84.388,
    },
    {
      id: uuidv4(),
      brand: 'Tesla',
      model: 'Model 3',
      year: 2020,
      isRented: false,
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: uuidv4(),
      brand: 'Subaru',
      model: 'Outback',
      year: 2017,
      isRented: true,
      latitude: 32.7157,
      longitude: -117.1611,
    },
    {
      id: uuidv4(),
      brand: 'Jeep',
      model: 'Wrangler',
      year: 2018,
      isRented: false,
      latitude: 38.9072,
      longitude: -77.0369,
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(Car)
      .values(this.carsData)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const carIds = this.carsData.map((el) => el.id);
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Car)
      .where('id IN (:...carIds)', { carIds })
      .execute();
  }
}
