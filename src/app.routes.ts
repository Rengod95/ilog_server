import { PracticeModule } from './practice/practice.module';
import { Routes } from '@nestjs/core';

export const RootRoutes: Routes = [
  {
    path: '/practice',
    module: PracticeModule,
  },
];
