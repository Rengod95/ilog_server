import { CreateLogMetaDto } from './dto/create-log-meta.dto';
import { LogService } from './log.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  // @Get('/all')
  // getAllLogs() {
  //   return this.logService.getAllLogs();
  // }

  @Post('/meta')
  createNewLogMeta(@Body() createLogMetaDto: CreateLogMetaDto) {
    return this.logService.createLogMeta(createLogMetaDto);
  }
}
