import { Controller, Post } from '@nestjs/common';
import { AwsService } from './aws.service';

@Controller()
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  /**
   *
   */
  @Post('/meta')
  async syncLogMetaData() {
    const res = await this.awsService.syncMetasToMongo();
    return res;
  }
}
