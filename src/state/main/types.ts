import { Authentication } from "../../generated";
import { IApiResponse } from "../types";

export type TUserCredentials = object | undefined;

export interface IMainState {
  authentication: IApiResponse<Authentication>;
}
