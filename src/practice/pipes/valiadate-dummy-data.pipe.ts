import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateDummyDto } from './../dto/create-dummy.dto';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateDummyDataPipe implements PipeTransform<CreateDummyDto> {
  async transform(value: CreateDummyDto, metadata: ArgumentMetadata) {
    const instance = plainToInstance(metadata.metatype, value);
    console.log(instance);
    const hasError = await validate(instance);
    if (hasError.length > 0) {
      hasError.forEach((error) => console.log(error.toString()));
      throw new BadRequestException('DummyDataValidataion has failed');
    }

    return value;
  }
}
