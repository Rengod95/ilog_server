import { Routes } from '@nestjs/core';
import { LogModule } from './log/log.module';

export const RootRoutes: Routes = [
  {
    path: 'log',
    module: LogModule,
  },
];
