import { GetLogListDto } from './dto/get-log-list.dto';
import { LogService } from './log.service';
import { Body, Controller, Get, Param } from '@nestjs/common';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

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
