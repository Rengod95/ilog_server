import { ConfigService } from '@nestjs/config';
import { AWSError, S3 } from 'aws-sdk';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AwsRepository } from './aws.repository';
import { BaseS3Object, IBaseS3Object } from './schema/s3-object.schema';
import { UtilService } from 'src/shared/util.service';
import { UpdateS3LambdaDto } from './dto/update-s3-document.dto';
import { DeleteS3LambdaDto } from './dto/delete-s3-document.dto';
import { CreateS3LambdaDto } from './dto/create-s3-document.dto';

@Injectable()
export class AwsService {
  private readonly s3: S3;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(AwsRepository) private readonly awsRepository: AwsRepository,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      },
      region: this.configService.get('AWS_S3_REGION'),
    });
  }

  public async updateExistS3Document(updateS3LambdaDto: UpdateS3LambdaDto) {
    try {
      const baseS3Object = this.createBaseS3ObjectFromDto(updateS3LambdaDto);
      return await this.awsRepository.replaceExistS3Document(baseS3Object);
    } catch (error) {
      this.handleAwsBaseError(error);
    }
  }

  public async deleteExistS3Document(deleteS3LambdaDto: DeleteS3LambdaDto) {
    try {
      const baseS3Object = this.createBaseS3ObjectFromDto(deleteS3LambdaDto);

      return await this.awsRepository.deleteS3Document(baseS3Object);
    } catch (error) {
      this.handleAwsBaseError(error);
    }
  }

  public async insertNewS3Document(createS3LambdaDto: CreateS3LambdaDto) {
    try {
      const baseS3Object = this.createBaseS3ObjectFromDto(createS3LambdaDto);

      return await this.awsRepository.injectSingleS3Object(baseS3Object);
    } catch (error) {
      this.handleAwsBaseError(error);
    }
  }

  /**
   *
   * aws s3에 특정 객체가 추가되었을 때
   * s3와 mongodb간 log 데이터를 동기화
   */
  public async syncMetasToMongo() {
    const contents = await this.getAllS3Objects();
    const duplicationInfos = await Promise.all(
      contents
        .map((content) => this.extractETagFromObject(content))
        .map((eTag) => this.getObjectDuplicationInfo(eTag)),
    );
    const filteredETags = duplicationInfos.filter((info) => !info.isDuplicated);

    if (filteredETags.length === 0)
      return 'there was no new S3 Object to inject to mongo.';

    const filteredS3Objects = contents
      .map((content) => {
        for (const eTagInfo of filteredETags) {
          if (content.ETag === eTagInfo.ETag) {
            return content;
          }
        }
        return;
      })
      .filter((obj) => !this.utilService.isEmpty(obj));

    const baseS3Objects = filteredS3Objects.map((obj) =>
      this.createBaseS3ObjectFromDto(obj),
    );

    const result = await this.awsRepository.injectS3ObjectsToMongo(
      baseS3Objects,
    );
    return result;
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

  private async getAllS3Objects(bucketName?: string): Promise<IBaseS3Object[]> {
    const result = await this.s3
      .listObjectsV2(
        {
          Bucket: bucketName || this.getBucketName(),
        },
        this.handleAwsBaseError,
      )
      .promise();

    return result.Contents as IBaseS3Object[];
  }

  private handleAwsBaseError<Tdata = unknown>(err: AWSError, data?: Tdata) {
    if (err) {
      throw new HttpException(
        `code : ${err.code} reason:${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return data;
  }

  private createBaseS3ObjectFromDto(s3Dto: IBaseS3Object): BaseS3Object {
    const eTag = this.extractETagFromObject(s3Dto);
    const lastModified = this.extractLastModifiedFromS3Object(s3Dto);
    const objKey = this.extractObjectKeyFromS3Object(s3Dto);
    const url = this.createS3ObjectUrl(this.getBucketName(), objKey);

    const s3Object: BaseS3Object = {
      ETag: eTag,
      LastModified: lastModified,
      Key: objKey,
      Url: url,
    };

    return s3Object;
  }

  private createS3ObjectUrl(
    bucketName: S3.BucketName,
    objectKey: S3.ObjectKey,
  ) {
    const objectUrl = `https://${bucketName}.s3.amazonaws.com/${objectKey}`;
    return objectUrl;
  }

  private extractETagFromObject(obj: S3.Object): S3.ETag {
    return obj.ETag;
  }

  private extractObjectKeyFromS3Object(obj: S3.Object): S3.ObjectKey {
    return obj.Key;
  }

  private extractLastModifiedFromS3Object(obj: S3.Object): S3.LastModified {
    return obj.LastModified;
  }

  private getBucketName(): string {
    return this.configService.get('AWS_S3_BUCKET_NAME');
  }
}

export type ETagDuplicationInfo = {
  isDuplicated: boolean;
  ETag: S3.ETag;
};
