import { CreateBoardValidationPipe } from './board.validation.pipe';
import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [BoardController],
  providers: [
    BoardService,
    {
      provide: APP_PIPE,
      useClass: CreateBoardValidationPipe,
    },
  ],
  exports: [BoardService],
})
export class BoardModule {}
