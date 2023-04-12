import { LogRepository } from './log.repository';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Log, LogSchema } from './log.schema';
import { AwsService } from 'src/aws/aws.service';
import { AwsRepository } from 'src/aws/aws.repository';
import {
  BaseS3Object,
  BaseS3ObjectSchema,
} from '../aws/schema/s3-object.schema';
import { NormalizeKeyPipe } from './normalize-key.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: BaseS3Object.name, schema: BaseS3ObjectSchema },
    ]),
  ],
  providers: [LogService, LogRepository, AwsRepository, NormalizeKeyPipe],
  controllers: [LogController],
})
export class LogModule {}
