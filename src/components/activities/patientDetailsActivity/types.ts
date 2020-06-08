import { IUserCredentials } from "../../../state/main/types";
import { IPatient } from "../../../state/patients/types";

export interface IStateProps {
  userCredentials: IUserCredentials;
  patients: Array<IPatient>; //TODO: use generated type here instead
}

export type TProps = IStateProps;
