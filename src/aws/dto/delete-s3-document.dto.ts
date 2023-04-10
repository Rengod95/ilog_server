import { S3 } from 'aws-sdk';
import { IsNotEmpty, IsString } from 'class-validator';

export interface IBaseS3LambdaDto {
  Key: S3.ObjectKey;
  ETag: S3.ETag;
}

export class DeleteS3LambdaDto implements IBaseS3LambdaDto {
  @IsNotEmpty()
  @IsString()
  Key: S3.ObjectKey;

  @IsNotEmpty()
  @IsString()
  ETag: S3.ETag;
}
