import { LoginResponse } from "./generated";
import { IMainState } from "./state/main/types";
import { IPatientsState } from "./state/patients/types";

export interface IStateProps {
  appStoredToken: string | undefined;
}

export interface IDispatchProps {
  setUserCredentials: (userCredentials: LoginResponse) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IState {
  main: IMainState;
  patients: IPatientsState;
}
