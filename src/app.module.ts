import { RootRoutes } from './app.routes';
import { AuthModule } from './Domain/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PracticeModule } from './practice/practice.module';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, PracticeModule, RouterModule.register(RootRoutes)],
})
export class AppModule {}
