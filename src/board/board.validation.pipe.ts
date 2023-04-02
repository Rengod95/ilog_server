import { plainToInstance } from 'class-transformer';
import { CreateBoardDto } from './dto/board-create-dto';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class CreateBoardValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // console.log(value);
    console.log(value);
    console.log(typeof value.status);
    if (value.status !== 'PUBLIC' && value.status !== 'PRIVATE') {
      throw new BadRequestException('status is not found');
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
