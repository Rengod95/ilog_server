export interface BaseResponse<TResult = any> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: TResult;
}
