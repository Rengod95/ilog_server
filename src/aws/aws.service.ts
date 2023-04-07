import { ConfigService } from '@nestjs/config';
import { AWSError, S3 } from 'aws-sdk';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AwsRepository } from './aws.repository';
import { BaseS3Object, IBaseS3Object } from './schema/s3-object.schema';

@Injectable()
export class AwsService {
  private readonly s3: S3;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(AwsRepository) private readonly awsRepository: AwsRepository,
  ) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      },
      region: this.configService.get('AWS_S3_REGION'),
    });
  }

  /**
   *
   * aws s3에 특정 객체가 추가되었을 때
   * s3와 mongodb간 log 데이터를 동기화
   */
  public async syncMetasToMongo() {
    const { contents } = await this.getAllS3Objects();

    const ETags = await Promise.all(
      contents
        .map((content) => this.extractETagFromObject(content))
        .map((eTag) => this.getObjectDuplicationInfo(eTag)),
    );

    const filteredETags = ETags.filter((info) => !info.isDuplicated);

    console.log('filtered tags :', filteredETags);

    if (filteredETags.length === 0)
      return 'there was no new S3 Object to inject to mongo.';

    const newObjects = contents.map((content) => {
      for (const eTagInfo of filteredETags) {
        if (content.ETag === eTagInfo.ETag) {
          return content;
        }
      }
      return;
    });

    await this.awsRepository.injectS3ObjectsToMongo(newObjects);

    return newObjects;
  }

  private extractETagFromObject(obj: S3.Object) {
    return obj.ETag;
  }

  /**
   * eTag 를 받아 중복에 대한 플래그 속성이 포함된 래퍼 객체를 반환
   * @param eTag
   */
  private async getObjectDuplicationInfo(
    eTag: S3.ETag,
  ): Promise<ETagDuplicationInfo> {
    const exist = await this.isAlreadyExistOnMongo(eTag);
    return {
      isDuplicated: exist,
      ETag: eTag,
    };
  }

  /**
   * eTag를 통해 특정 s3 object 가 mongoDB에 존재하는지 검사
   * @param eTag
   * @returns 해당 eTag 객체가 존재하면 true, 아니면 false
   */
  private async isAlreadyExistOnMongo(eTag: S3.ETag): Promise<boolean> {
    const exist = await this.awsRepository.findS3DocumentByETag(eTag);
    return !!exist;
  }

  private async getAllS3Objects(bucketName?: string) {
    const metas = await this.s3
      .listObjectsV2(
        {
          Bucket: bucketName || this.configService.get('AWS_S3_BUCKET_NAME'),
        },
        this.handleAwsBaseError,
      )
      .promise();

    return { counts: metas.KeyCount, contents: metas.Contents };
  }

  private handleAwsBaseError<Tdata = unknown>(err: AWSError, data: Tdata) {
    if (err) {
      throw new HttpException(
        `code : ${err.code} reason:${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }
}

export interface IBucketObjectMeta {}

export type ETagDuplicationInfo = {
  isDuplicated: boolean;
  ETag: S3.ETag;
};
