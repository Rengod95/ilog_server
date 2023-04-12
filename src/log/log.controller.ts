import { LogService } from './log.service';
import { Body, Controller, Get, Param, Query } from '@nestjs/common';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('/list')
  async getLogList(@Query('skip') skip: string, @Query('limit') limit: string) {
    const result = await this.logService.getLogList(skip, limit);
    return result;
  }

  @Get('/:etag')
  async getLogData(@Param('etag') etag: string) {
    const result = await this.logService.getSingleLogDataByETag(etag);
    return result;
  }
}
