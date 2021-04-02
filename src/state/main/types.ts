import { LoginResponse, UserProfileDTO } from "../../generated";
import { IApiResponse } from "../types";

export type TUserCredentials = LoginResponse | undefined;

export interface IMainState {
  authentication: IApiResponse<LoginResponse>;
  me: IApiResponse<UserProfileDTO>;
}
