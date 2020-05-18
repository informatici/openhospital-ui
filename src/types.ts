import { IUserCredentials } from "./state/main/types";

export interface IStateProps {
  userCredentials: IUserCredentials;
}

export interface IDispatchProps {
  setToken: (token: string) => void;
}

export type TProps = IStateProps & IDispatchProps;

export interface IState {
  main: {
    userCredentials: IUserCredentials;
  };
}
