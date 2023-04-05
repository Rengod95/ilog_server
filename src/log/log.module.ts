import { LogRepository } from './log.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsService } from './../commons/services/aws.service';
import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Log, LogSchema } from './log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogService, AwsService, LogRepository],
  controllers: [LogController],
})
export class LogModule {}
