import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/CreateUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/new')
  @UsePipes(ValidationPipe)
  createNewUser(@Body() createUserDto: CreateUserDto) {
    console.log('at auth controller - dto: ', createUserDto);
    return this.authService.createAccessToken(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser() {
    console.log('entry getUser handler');

    return 'asdasd';
  }
}
