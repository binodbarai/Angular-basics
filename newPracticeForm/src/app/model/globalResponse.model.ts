export class GlobalResponseModel<T>{
  timestamp: Date | undefined;
  message: string | undefined;
  status: string | undefined;
  data: T | undefined;
}
