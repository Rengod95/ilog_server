import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  private readonly s3: S3;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.configService = configService;
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
      },
    });
  }

  async getAllS3Objects(bucketName?: string) {
    console.log(this.configService.get('AWS_S3_BUCKET_NAME'));
    const req = this.s3.listObjectsV2(
      {
        Bucket: bucketName || this.configService.get('AWS_S3_BUCKET_NAME'),
      },
      (err, data) => {
        if (err) {
          throw new HttpException(
            `code : ${err.code} reason:${err.message}`,
            HttpStatus.BAD_REQUEST,
          );
        } else {
          console.log(data.Contents);
        }
      },
    );

    return 'success';
  }
}
