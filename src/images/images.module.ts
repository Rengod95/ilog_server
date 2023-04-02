import { BoardModule } from './../board/board.module';
import { ImagesController } from './images.controller';
import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { APP_PIPE } from '@nestjs/core';
import { CreateBoardValidationPipe } from 'src/board/board.validation.pipe';

@Module({
  providers: [
    ImagesService,
    { provide: APP_PIPE, useClass: CreateBoardValidationPipe },
  ],
  controllers: [ImagesController],
  imports: [BoardModule],
})
export class ImagesModule {}
