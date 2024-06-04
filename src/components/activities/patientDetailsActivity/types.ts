import { TUserCredentials } from "../../../state/main/types";
import { ApiResponse } from "../../../state/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patient: ApiResponse<PatientDTO>;
}

export interface IDispatchProps {
  getPatientThunk: (id: string) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_EDITING";

export type IUserSection =
  | "admissions"
  | "visits"
  | "triage"
  | "therapy"
  | "laboratory"
  | "operation"
  | "admission"
  | "discharge"
  | "clinic";
