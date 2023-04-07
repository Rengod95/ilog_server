import { Routes } from '@nestjs/core';
import { LogModule } from './log/log.module';
import { AwsModule } from './aws/aws.module';

export const RootRoutes: Routes = [
  {
    path: 'log',
    module: LogModule,
  },
  {
    path: 'aws',
    module: AwsModule,
  },
];
