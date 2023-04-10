import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { Document } from 'mongoose';

export interface IBaseS3Object {
  Key: S3.ObjectKey;
  /**
   * Creation date of the object.
   */
  LastModified: S3.LastModified;
  /**
   * The entity tag is a hash of the object. The ETag reflects changes only to the contents of an object, not its metadata. The ETag may or may not be an MD5 digest of the object data. Whether or not it is depends on how the object was created and how it is encrypted as described below:   Objects created by the PUT Object, POST Object, or Copy operation, or through the Amazon Web Services Management Console, and are encrypted by SSE-S3 or plaintext, have ETags that are an MD5 digest of their object data.   Objects created by the PUT Object, POST Object, or Copy operation, or through the Amazon Web Services Management Console, and are encrypted by SSE-C or SSE-KMS, have ETags that are not an MD5 digest of their object data.   If an object is created by either the Multipart Upload or Part Copy operation, the ETag is not an MD5 digest, regardless of the method of encryption. If an object is larger than 16 MB, the Amazon Web Services Management Console will upload or copy that object as a Multipart Upload, and therefore the ETag will not be an MD5 digest.
   */
  ETag: S3.ETag;

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