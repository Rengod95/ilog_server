import { Board } from './board.model';
import { CreateBoardDto } from './dto/board-create-dto';
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardService {
  createBoardData(data: CreateBoardDto) {
    const { title, content, status, tags } = data;
    const board: Board = {
      title,
      content,
      status,
      tags,
      boardId: uuid(),
    };
    return board;
  }
}
