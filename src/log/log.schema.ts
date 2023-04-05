import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface LogMeta {
  title: string;
  last_modified: string;
  thumbnail?: string;
}

export type LogDocument = Document & Log;

@Schema()
export class Log implements LogMeta {
  @Prop()
  title: string;

  @Prop()
  last_modified: string;

  @Prop()
  thumbnail?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
