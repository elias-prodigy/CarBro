import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from './apps/user/user.module';
import { AuthModule } from './apps/auth/auth.module';
import { AppController } from './app.controller';
import { typeOrmConfig } from '../typeOrm.config';
import { CarModule } from './apps/car/car.module';
import { RentalModule } from './apps/rental/rental.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => typeOrmConfig,
    }),
    UserModule,
    AuthModule,
    CarModule,
    RentalModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
