export type BoardStatus = 'PUBLIC' | 'PRIVATE';

export interface Board {
  boardId: string;
  title: string;
  tags?: string[];
  content: string;
  status: BoardStatus;
}
