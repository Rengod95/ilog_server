import { RootRoutes } from './app.routes';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from './aws/aws.module';
import { BaseResponseInterceptor } from './app.response.interceptor';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.production`,
    }),
    RouterModule.register(RootRoutes),
    LogModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AwsModule,
  ],
})
export class AppModule {}
