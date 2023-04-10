import { S3 } from 'aws-sdk';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBaseS3LambdaDto } from './delete-s3-document.dto';

export class CreateS3LambdaDto implements IBaseS3LambdaDto {
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
