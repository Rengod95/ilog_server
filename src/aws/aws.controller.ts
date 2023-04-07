import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { AwsService } from './aws.service';
import { DeleteS3LambdaDto } from './dto/delete-object.dto';
import { ModifyS3LambdaDto } from './dto/modify-object.dto';

@Controller('/meta')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  /**
   *
   */
  @Post()
  async syncLogMetaData() {
    const res = await this.awsService.syncMetasToMongo();
    return res;
  }

  @Patch()
  async modifyExistObject(@Body() modifyS3LambdaDto: ModifyS3LambdaDto) {
    console.log(modifyS3LambdaDto);

    return 'modified';
  }

  @Delete()
  async deleteExistObject(@Body() deleteS3LambdaDto: DeleteS3LambdaDto) {
    console.log(deleteS3LambdaDto);

    return 'deleted';
  }
}
