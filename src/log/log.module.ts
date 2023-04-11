import { LogRepository } from './log.repository';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Log, LogSchema } from './log.schema';
import { AwsService } from 'src/aws/aws.service';
import { AwsRepository } from 'src/aws/aws.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogService, LogRepository, AwsRepository],
  controllers: [LogController],
})
export class LogModule {}
