import { TUserCredentials } from "../../../state/main/types";
import { IApiResponse } from "../../../state/types";
import { PatientDTO } from "../../../generated";

export interface IStateProps {
  userCredentials: TUserCredentials;
  patient: IApiResponse<PatientDTO>;
}

export interface IDispatchProps {
  getPatientThunk: (id: string) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState = "IDLE" | "TO_PATIENT_EDITING";
