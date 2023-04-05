import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api'); // Setting base path
  app.useGlobalPipes(new ValidationPipe()); // Initialize global validation

  const config = new ConfigService();
  console.log(config);
  console.log(config.get('PORT'));

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
