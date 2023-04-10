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
    eTag: S3.ETag,
  ): Promise<BaseS3ObjectDocument> {
    const s3Document = this.s3ObjectModel.findOne({ ETag: eTag }).exec();
    return s3Document;
  }

  public async injectS3ObjectsToMongo(s3Objects: BaseS3Object[]) {
    const s3Docs = await Promise.all(
      s3Objects.map((s3Obj) => this.createS3Document(s3Obj)),
    );
    const result = this.s3ObjectModel.insertMany(s3Docs);
    return result;
  }

  public async injectSingleS3Object(baseS3Object: BaseS3Object) {
    const s3Doc = await this.createS3Document(baseS3Object);
    const result = s3Doc.save();
    return result;
  }

  public async deleteS3DocumentByKey(key: S3.ObjectKey) {
    const result = this.s3ObjectModel.findOneAndRemove({ Key: key }).exec();
    return result;
  }

  public async replaceExistS3Document(replacement: BaseS3Object) {
    const result = this.s3ObjectModel
      .findOneAndReplace({ ETag: replacement.ETag }, replacement)
      .exec();
    return result;
  }

  private async createS3Document(
    baseS3Object: BaseS3Object,
  ): Promise<BaseS3ObjectDocument> {
    const result = await this.s3ObjectModel.create(baseS3Object);
    return result;
  }
}
