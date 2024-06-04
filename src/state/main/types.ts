import { UserSettingDTO } from "../../generated";
import { LoginResponse } from "../../generated/models/LoginResponse";
import { TPermission } from "../../types";
import { ApiResponse } from "../types";

export type TUserCredentials = LoginResponse | undefined;

export interface IAuthentication extends LoginResponse {
  permissions: TPermission[];
}

export interface IMainState {
  authentication: ApiResponse<IAuthentication>;
  logout: ApiResponse<void>;
  forgotpassword: ApiResponse<void>;
  settings: ApiResponse<UserSettingDTO[]>;
}
