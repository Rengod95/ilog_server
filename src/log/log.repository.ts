import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './log.schema';
import { Model } from 'mongoose';
import { AwsRepository } from 'src/aws/aws.repository';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}
}
