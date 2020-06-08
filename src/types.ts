import { IUserCredentials, IMainState } from "./state/main/types";
import { IPatientsState } from "./state/patients/types";

export interface IStateProps {
  userCredentials: IUserCredentials;
}

export interface IDispatchProps {
  setToken: (token: string) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IState {
  main: IMainState;
  patients: IPatientsState;
}
