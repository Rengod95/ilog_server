import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetLogListDto {
  @IsNotEmpty()
  @IsNumber()
  skip: number;
  @IsNotEmpty()
  @IsNumber()
  limit: number;
}
