import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  findImagesByLogId(id: string) {
    return id;
  }
}
