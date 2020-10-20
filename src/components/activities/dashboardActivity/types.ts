import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IOwnProps & IStateProps;
