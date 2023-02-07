export interface IAction<Payload, Error> {
  type: string;
  payload?: Payload | Error;
  meta?: any;
  error?: boolean | Error;
}

export type TAPIResponseStatus =
  | "IDLE"
  | "LOADING"
  | "SUCCESS"
  | "SUCCESS_EMPTY"
  | "FAIL";

export interface IApiResponse<T> {
  status?: TAPIResponseStatus;
  isLoading?: boolean;
  hasSucceeded?: boolean;
  data?: T;
  error?: any;
}
