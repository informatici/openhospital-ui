import { LoginResponse } from "../../../generated";
import { IAction, TAPIResponseStatus } from "../../../state/types";

interface IOwnProps {
  successRoute: string;
}

export interface IStateProps {
  status: TAPIResponseStatus;
}

export interface IDispatchProps {
  setAuthenticationThunk: (username: string, password: string) => void;
  setAuthenticationSuccess: (
    userCredentials: LoginResponse
  ) => IAction<LoginResponse, {}>;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export interface IValues {
  username: string;
  password: string;
}
