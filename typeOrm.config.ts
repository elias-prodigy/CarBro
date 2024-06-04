import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import { User } from './src/apps/user/user.model';
import { Car } from "./src/apps/car/car.model";
import { Rental } from "./src/apps/rental/rental.model";
import {
  InitialMigration1717324857327
} from "./src/migration/1717324857327-InitialMigration";
import { CreateSuperAdminUser1717325975367 } from './src/migration/1717325975367-CreateSuperAdmin';
import { PopulateCars1717515391671 } from './src/migration/1717515391671-PopulateCars';

config();

const configService = new ConfigService();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User, Car, Rental],
  synchronize: true,
  migrations: [
    InitialMigration1717324857327,
    CreateSuperAdminUser1717325975367,
    PopulateCars1717515391671
  ],
};

export default new DataSource(typeOrmConfig);
