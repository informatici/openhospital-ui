import { TUserCredentials } from "../../../state/main/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
  hasSucceeded: boolean | undefined;
}

export interface IDispatchProps {
  createPatient: (patient: PatientDTO) => any;
  createPatientReset: () => any;
}

export type TProps = IStateProps & IDispatchProps;
