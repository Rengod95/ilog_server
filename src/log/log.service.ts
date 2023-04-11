import { AwsService } from 'src/aws/aws.service';
import { CreateLogMetaDto } from './dto/create-log-meta.dto';
import { LogRepository } from './log.repository';
import { Inject, Injectable } from '@nestjs/common';
import { AwsRepository } from 'src/aws/aws.repository';
import { GetLogListDto } from './dto/get-log-list.dto';
import { S3 } from 'aws-sdk';

@Injectable()
export class LogService {
  constructor(
    @Inject(AwsRepository) private readonly awsRepository: AwsRepository,
    @Inject(LogRepository) private readonly logRepository: LogRepository,
  ) {}

  // getAllLogs() {
  //   return this.awsService.getAllObjectsByBucketName();
  // }

  createLogMeta(createLogMetaDto: CreateLogMetaDto) {
    return this.logRepository.createLogMeta(createLogMetaDto);
  }

  public async getLogList(getLogListDto: GetLogListDto) {
    const limit = this.extractLimitCount(getLogListDto);
    const skip = this.extractSkipCount(getLogListDto);

    const result = await this.awsRepository.getS3ObjectsWithPagination(
      skip,
      limit,
    );
    return result;
  }

  public async getSingleLogDataByKey(key: S3.ObjectKey) {
    const result = this.awsRepository.findS3DocumentByKey(key);
    return result;
  }

  private extractSkipCount(dto: GetLogListDto): number {
    const skip = dto.skip;
    return skip;
  }

  private extractLimitCount(dto: GetLogListDto): number {
    const limit = dto.limit;
    return limit;
  }
}
