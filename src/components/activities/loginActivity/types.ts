import { TAPIResponseStatus } from "../../../state/types";

interface IOwnProps {}

export interface IRedirectAfterLogin {
  successRoute: string;
}

export interface IStateProps {
  status: TAPIResponseStatus;
  errorType: string | number | undefined;
}

export interface IDispatchProps {
  setAuthenticationThunk: (username: string, password: string) => void;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export interface IValues {
  username: string;
  password: string;
}
