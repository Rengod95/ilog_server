import { BoardService } from './../board/board.service';
import { ImagesService } from './images.service';
import { Controller, Get, Param, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { CreateBoardValidationPipe } from 'src/board/board.validation.pipe';

@Controller('images/log')
export class ImagesController {
  constructor(
    private imagesService: ImagesService,
    private boardService: BoardService,
  ) {}

  @Get('/:id')
  @UsePipes(CreateBoardValidationPipe)
  getLogImages(@Param('id') id: string): string {
    console.log(id);
    return this.imagesService.findImagesByLogId(id);
  }
}
