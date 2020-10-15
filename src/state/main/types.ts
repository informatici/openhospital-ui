import { LoginResponse } from "../../generated";
import { IApiResponse } from "../types";

export type TUserCredentials = LoginResponse | undefined;

export interface IMainState {
  authentication: IApiResponse<LoginResponse>;
}
