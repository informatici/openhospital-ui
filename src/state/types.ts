export interface IAction<Payload, Error> {
  type: string;
  payload?: Payload | Error;
  meta?: any;
  error?: boolean;
}

export interface IApiResponse<T> {
  isLoading: boolean;
  hasSucceeded?: boolean;
  data?: T;
  error?: any;
}
