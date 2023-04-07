import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
  ) {}

  async createLogMeta(meta: Log) {
    const data = new this.logModel(meta);
    return await data.save();
  }

  async getLogMetaById(id: string): Promise<Log> {
    return await this.logModel.findById(id);
  }

  // async syncLogMetaToS3() {}
}
