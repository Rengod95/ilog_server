import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface ICreateDummyDto {
  title: string;
  content: string;
  email: string;
  dummyId?: string;
}

export class CreateDummyDto implements ICreateDummyDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  dummyId?: string;
}
