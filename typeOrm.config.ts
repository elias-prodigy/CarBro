import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

import {User} from "./src/apps/user/user.model";
import {CreateSuperAdminUser1685647891234} from "./src/migration/1717325975367-CreateSuperAdmin";

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User],
  migrations: [CreateSuperAdminUser1685647891234],
});