import { IsNotEmpty } from 'class-validator';
import { Board, BoardStatus } from './../board.model';
import { Injectable } from '@nestjs/common';

// @Injectable()
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  status: BoardStatus;

  tags?: string[];
}
