import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  Logger.log(`🚀 Account is running! `);
}

bootstrap();
