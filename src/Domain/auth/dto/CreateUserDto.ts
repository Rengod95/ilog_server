import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from './../../users/user.service';

export class CreateUserDto implements UserModel {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  dummyId?: string;
}
