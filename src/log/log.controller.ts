import { CreateLogMetaDto } from './dto/create-log-meta.dto';
import { GetLogListDto } from './dto/get-log-list.dto';
import { LogService } from './log.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('/meta')
  createNewLogMeta(@Body() createLogMetaDto: CreateLogMetaDto) {
    return this.logService.createLogMeta(createLogMetaDto);
  }

  @Get('/list')
  async getLogList(@Body() getLogListDto: GetLogListDto) {
    const result = await this.logService.getLogList(getLogListDto);
    return result;
  }

  @Get('/:key')
  async getLogData(@Param('key') key: string) {
    const result = await this.logService.getSingleLogDataByKey(key);
    return result;
  }
}
