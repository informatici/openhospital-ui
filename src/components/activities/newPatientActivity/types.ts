import { TUserCredentials } from "../../../state/main/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
}

export interface IDispatchProps {
  createPatient: (patient: PatientDTO) => any;
}

export type TProps = IStateProps & IDispatchProps;
