import { IUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
}

export interface IStateProps {
  userCredentials: IUserCredentials;
}

export type TProps = IOwnProps & IStateProps;
