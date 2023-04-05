import { MongoConfigService } from './mongo.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MongoConfigService],
})
export class MongoConfigModule {}
