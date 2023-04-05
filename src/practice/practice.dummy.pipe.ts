import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DummyIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('dummy pipe - meta :', metadata);
    console.log('dummy pipe - value :', value);

    return value;
  }
}
