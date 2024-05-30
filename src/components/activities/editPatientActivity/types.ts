import { PatientDTO } from "../../../generated";
import { TUserCredentials } from "../../../state/main/types";
import { ApiResponse } from "../../../state/types";

export interface IStateProps {
  userCredentials: TUserCredentials;
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
  patient: ApiResponse<PatientDTO>;
}

export interface IDispatchProps {
  getPatientThunk: (id: string) => void;
  updatePatientReset: () => any;
  updatePatient: (code: number, updatePatient: PatientDTO) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState =
  | "IDLE"
  | "TO_KEEP_EDITING"
  | "TO_PATIENT"
  | "TO_DASHBOARD";
