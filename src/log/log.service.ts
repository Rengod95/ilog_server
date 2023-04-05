import { CreateLogMetaDto } from './dto/create-log-meta.dto';
import { LogRepository } from './log.repository';
import { Inject, Injectable } from '@nestjs/common';
import { AwsService } from 'src/commons/services/aws.service';

@Injectable()
export class LogService {
  constructor(
    @Inject(AwsService) private readonly awsService: AwsService,
    @Inject(LogRepository) private readonly logRepository: LogRepository,
  ) {}

  getAllLogs() {
    return this.awsService.getAllS3Objects();
  }

  createLogMeta(createLogMetaDto: CreateLogMetaDto) {
    return this.logRepository.createLogMeta(createLogMetaDto);
  }
}
