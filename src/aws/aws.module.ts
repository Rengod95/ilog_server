import { Module } from '@nestjs/common';
import { AwsController } from './aws.controller';
import { AwsService } from './aws.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseS3Object, BaseS3ObjectSchema } from './schema/s3-object.schema';
import { AwsRepository } from './aws.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BaseS3Object.name, schema: BaseS3ObjectSchema },
    ]),
  ],
  controllers: [AwsController],
  providers: [AwsService, AwsRepository],
})
export class AwsModule {}
