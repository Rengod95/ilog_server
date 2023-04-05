import { CreateDummyDto } from './dto/create-dummy.dto';
import { Dummy } from './model/Dummy';
import { GenerateDummyIdPipe } from './pipes/practice.generate-dummy-id.pipe';
import { ValidateDummyDataPipe } from './pipes/valiadate-dummy-data.pipe';

import { PracticeService } from './practice.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}
  @Get('/:id')
  async getDummyData(@Param('id') id: string) {
    return id;
  }

  @Post('/new')
  @UsePipes(ValidateDummyDataPipe, GenerateDummyIdPipe)
  async createDummyData(@Body() createDummyDto: CreateDummyDto) {
    console.log(createDummyDto);
    return this.practiceService.createNewDummy(createDummyDto);
  }
}
