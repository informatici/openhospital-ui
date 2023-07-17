import { LoginResponse } from "../../generated/models/LoginResponse";
import { TPermission } from "../../types";
import { IApiResponse } from "../types";

export type TUserCredentials = LoginResponse | undefined;

export interface IAuthentication extends LoginResponse {
  permissions: TPermission[];
}

export interface IMainState {
  authentication: IApiResponse<IAuthentication>;
  logout: IApiResponse<void>;
  forgotpassword: IApiResponse<void>;
}
