import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BaseResponse } from './shared/app.response';

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse> {
    return next.handle().pipe(
      map((data) => {
        return {
          isSuccess: true,
          code: 1000,
          message: 'success',
          result: data,
        } as BaseResponse;
      }),
    );
  }
}
