import { CreateBoardValidationPipe } from './board.validation.pipe';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/board-create-dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post('/new')
  createNewBoard(
    @Body(CreateBoardValidationPipe) createBoardDto: CreateBoardDto,
  ): Board {
    return this.boardService.createBoardData(createBoardDto);
  }
}
