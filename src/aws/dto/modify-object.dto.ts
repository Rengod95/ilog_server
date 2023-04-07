import { S3 } from 'aws-sdk';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBaseS3LambdaDto } from './delete-object.dto';

export class ModifyS3LambdaDto implements IBaseS3LambdaDto {
  @IsNotEmpty()
  @IsString()
  ETag: S3.ETag;
}
