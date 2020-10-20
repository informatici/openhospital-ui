import { PatientDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";

interface IOwnProps {
  dashboardRoute: string;
}

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

export type TProps = IOwnProps & IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_NEW_PATIENT_RESET"
  | "TO_DASHBOARD";
