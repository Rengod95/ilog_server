import { IsNotEmpty, IsString } from 'class-validator';
import { LogMeta } from './../log.schema';

export class CreateLogMetaDto implements LogMeta {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  last_modified: string;
  @IsString()
  thumbnail?: string;
}
