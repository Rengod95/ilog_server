import { S3 } from 'aws-sdk';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBaseS3Object } from '../schema/s3-object.schema';

export interface IBaseS3LambdaDto extends IBaseS3Object {}

export class DeleteS3LambdaDto implements IBaseS3LambdaDto {
  @IsNotEmpty()
  @IsString()
  Key: S3.ObjectKey;

  @IsNotEmpty()
  @IsString()
  LastModified: S3.LastModified;

  @IsNotEmpty()
  @IsString()
  ETag: S3.ETag;
}
