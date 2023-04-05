import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConfigService {
  constructor(private readonly configService: ConfigService) {}

  public getUri() {
    const id = this.configService.get('MONGO_DB_ID');
    const password = this.configService.get('MONGO_DB_PASSWORD');
    const cluster_name = this.configService.get('MONGO_DB_CLUSTER_NAME');

    return `mongodb+srv://${id}:${password}@${cluster_name}.qnd1peq.mongodb.net/?retryWrites=true&w=majority`;
  }
}
