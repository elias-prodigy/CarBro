import { NestFactory } from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import "reflect-metadata";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );
  await app.listen(3000);
}
bootstrap();
