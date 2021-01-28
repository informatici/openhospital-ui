import { LoginResponse } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { IAction } from "../../../state/types";

export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export interface IDispatchProps {
  setAuthenticationSuccess: (
    userCredentials: LoginResponse
  ) => IAction<LoginResponse, {}>;
}

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_PATIENT"
  | "TO_SEARCH_PATIENT";
