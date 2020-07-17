import { TUserCredentials } from "../../../state/main/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export type TProps = IStateProps;

export interface IPatientSearchItemProps {
  patient: any; //TODO: use generated type here
}
