export interface IAction<Payload, Error> {
  type: string;
  payload?: Payload | Error;
  meta?: any;
  error?: boolean;
}

type TAPIResponseStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAIL";

export interface IApiResponse<T> {
  status?: TAPIResponseStatus;
  isLoading?: boolean;
  hasSucceeded?: boolean;
  data?: T;
  error?: any;
}
