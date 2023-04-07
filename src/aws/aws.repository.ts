import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseS3Object, BaseS3ObjectDocument } from './schema/s3-object.schema';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/mongo/mongo.repository';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsRepository implements MongoRepository {
  constructor(
    @InjectModel(BaseS3Object.name)
    private readonly s3ObjectModel: Model<BaseS3ObjectDocument>,
  ) {}

  /**
   * mongoDB S3Object collection에서 eTag와 일치하는 Document 조회
   * @param eTag
   */
  public async findS3DocumentByETag(
    eTag: string,
  ): Promise<BaseS3ObjectDocument> {
    const document = await this.s3ObjectModel.findOne({ ETag: eTag }).exec();
    return document;
  }

  public async injectS3ObjectsToMongo(S3ObjectArray: S3.Object[]) {
    return await this.s3ObjectModel.insertMany(S3ObjectArray);
  }
}
