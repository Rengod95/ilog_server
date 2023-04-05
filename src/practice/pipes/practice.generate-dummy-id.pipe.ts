import { randomUUID } from 'crypto';
import { CreateDummyDto } from './../dto/create-dummy.dto';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class GenerateDummyIdPipe
  implements PipeTransform<CreateDummyDto, CreateDummyDto>
{
  transform(value: CreateDummyDto, metadata: ArgumentMetadata) {
    const dummy = { ...value, dummyId: randomUUID() };
    console.log('generate dummy id pipe - dummy:', dummy);
    return dummy;
  }
}
