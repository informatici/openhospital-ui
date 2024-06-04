import { immerable } from "immer";

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

export class ApiResponse<T> {
  [immerable] = true;
  status?: TAPIResponseStatus;
  data?: T;
  error?: any;
  get isLoading(): boolean {
    return this.status === "LOADING";
  }
  get hasSucceeded(): boolean {
    return this.status === "SUCCESS";
  }
  get hasFailed() {
    return this.status === "FAIL";
  }
  get isSuccessEmpty() {
    return this.status === "SUCCESS_EMPTY";
  }

  constructor(props: { status?: TAPIResponseStatus; data?: T; error?: any }) {
    this.status = props.status ?? "IDLE";
    this.data = props.data;
    this.error = props.error;
  }
}
