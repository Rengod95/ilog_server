import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseS3Object, BaseS3ObjectSchema } from './schema/s3-object.schema';
import { AwsRepository } from './aws.repository';
import { UtilService } from 'src/shared/util.service';
import { NormalizeKeyDtoPipe } from '../log/normalize-key.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BaseS3Object.name, schema: BaseS3ObjectSchema },
    ]),
  ],
  controllers: [AwsController],
  providers: [AwsService, AwsRepository, UtilService, NormalizeKeyDtoPipe],
})
export class AwsModule {}
