import { PatientDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createPatient: (patient: PatientDTO) => any;
  createPatientReset: () => any;
}

export type TProps = IStateProps & IDispatchProps;
