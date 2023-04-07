import { AwsService } from 'src/aws/aws.service';
import { CreateLogMetaDto } from './dto/create-log-meta.dto';
import { LogRepository } from './log.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(
    @Inject(LogRepository) private readonly logRepository: LogRepository,
  ) {}

  // getAllLogs() {
  //   return this.awsService.getAllObjectsByBucketName();
  // }

  createLogMeta(createLogMetaDto: CreateLogMetaDto) {
    return this.logRepository.createLogMeta(createLogMetaDto);
  }
}
