import { CreateDummyDto } from './dto/create-dummy.dto';
import { Dummy } from './model/Dummy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PracticeService {
  private dummy: any[];
  constructor() {
    this.dummy = [];
  }

  async createNewDummy(createDummyDto: CreateDummyDto) {
    this.dummy = [...this.dummy, createDummyDto];
    return this.dummy;
  }

  async getDummy() {
    return this.dummy;
  }
}
