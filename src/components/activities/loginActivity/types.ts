import { TUserCredentials } from "../../../state/main/types";
import { IApiResponse } from "../../../state/types";
import { Authentication } from "../../../generated/models/Authentication";

interface IOwnProps {
  successRoute: string;
}

export interface IStateProps {
  authenticated: boolean | undefined;
  isLoading: boolean;
}

export interface IDispatchProps {
  setAuthentication: (username: string, password: string) => void;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export interface IValues {
  username: string;
  password: string;
}
