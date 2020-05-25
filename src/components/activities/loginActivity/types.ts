import { IUserCredentials } from "../../../state/main/types";

interface IOwnProps {
  successRoute: string;
}
export interface IStateProps {
  userCredentials: IUserCredentials;
}

export type TProps = IOwnProps & IStateProps;

export interface IValues {
  email: string;
  password: string;
}