import { IUserCredentials } from "../../../state/main/types";

export interface IStateProps {
  userCredentials: IUserCredentials;
}

export type TProps = IStateProps;

export interface IPatientSearchItemProps {
  patient: any; //TODO: use generated type here
}
