import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { AwsService } from './aws.service';
import { DeleteS3LambdaDto } from './dto/delete-s3-document.dto';
import { CreateS3LambdaDto } from './dto/create-s3-document.dto';
import { NormalizeKeyDtoPipe } from '../log/normalize-key.pipe';

@Controller('/meta')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  /**
   * @param createS3LambdaDto
   */
  @Post()
  async insertNewObject(@Body() createS3LambdaDto: CreateS3LambdaDto) {
    console.log(createS3LambdaDto);
    const result = await this.awsService.insertNewS3Document(createS3LambdaDto);
    return result;
  }

  /**
   *
   * @param deleteS3LambdaDto
   * @returns
   */
  @Delete()
  async deleteExistObject(@Body() deleteS3LambdaDto: DeleteS3LambdaDto) {
    console.log(deleteS3LambdaDto);
    const result = await this.awsService.deleteExistS3Document(
      deleteS3LambdaDto,
    );
    return result;
  }
}
