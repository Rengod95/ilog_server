import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BaseResponseInterceptor } from './app.response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api'); // Setting base path
  app.useGlobalPipes(new ValidationPipe()); // Initialize global validation

  app.useGlobalInterceptors(new BaseResponseInterceptor());

  await app.listen(process.env.PORT || 8081);
}
bootstrap();
