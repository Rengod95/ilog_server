import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { Document } from 'mongoose';

export interface IBaseS3Object {
  Key: S3.ObjectKey;
  ETag: S3.ETag;
  LastModified: S3.LastModified;
  Url?: string;
}

@Schema()
export class BaseS3Object implements IBaseS3Object {
  @Prop()
  Key: S3.ObjectKey;
  @Prop({ type: Date })
  LastModified: S3.LastModified;
  @Prop()
  ETag: S3.ETag;
  @Prop()
  Url: string;
}

export type BaseS3ObjectDocument = Document & BaseS3Object;
export const BaseS3ObjectSchema = SchemaFactory.createForClass(BaseS3Object);
