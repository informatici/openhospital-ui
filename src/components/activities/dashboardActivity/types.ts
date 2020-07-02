import { TUserCredentials } from "../../../state/main/types";

export interface IOwnProps {
  newPatientRoute: string;
  searchPatientRoute: string;
}

export interface IStateProps {
  userCredentials: TUserCredentials;
  name: string | undefined;
}

export type TProps = IOwnProps & IStateProps;
