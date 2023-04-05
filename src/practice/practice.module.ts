import { Dummy } from './model/Dummy';
import { GenerateDummyIdPipe } from './pipes/practice.generate-dummy-id.pipe';
import { ValidateDummyDataPipe } from './pipes/valiadate-dummy-data.pipe';
import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';

@Module({
  controllers: [PracticeController],
  providers: [PracticeService, ValidateDummyDataPipe, GenerateDummyIdPipe],
})
export class PracticeModule {}
