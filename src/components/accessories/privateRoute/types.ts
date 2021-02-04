import { RouteProps } from "react-router-dom";
import { LoginResponse } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IAction } from "../../../state/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export interface IDispatchProps {
  setAuthenticationSuccess: (
    userCredentials: LoginResponse
  ) => IAction<LoginResponse, {}>;
}

export type TProps = RouteProps & IStateProps & IDispatchProps;
