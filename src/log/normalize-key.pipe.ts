import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateS3LambdaDto } from '../aws/dto/create-s3-document.dto';

@Injectable()
export class NormalizeKeyPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      throw new BadRequestException('Invalid key');
    }

    // Key normalization logic
    const normalizedKey = ('contents/' + value + '.md')
      .replace('\n', '')
      .normalize('NFC');

    return normalizedKey;
  }
}

@Injectable()
export class NormalizeKeyDtoPipe implements PipeTransform {
  transform(value: CreateS3LambdaDto) {
    if (!value || !value.Key) {
      throw new BadRequestException('Invalid key');
    }

    // Key normalization logic
    value.Key = value.Key.normalize('NFC');

    return value;
  }
}
