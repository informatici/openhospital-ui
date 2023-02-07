import { LoginResponse } from "../../generated";
import { TPermission } from "../../types";
import { IApiResponse } from "../types";

export type TUserCredentials = LoginResponse | undefined;

export interface IAuthentication extends LoginResponse {
  permissions: TPermission[];
  userGroupName: string;
  userDesc: string;
}

export interface IMainState {
  authentication: IApiResponse<IAuthentication>;
  logout: IApiResponse<void>;
}
