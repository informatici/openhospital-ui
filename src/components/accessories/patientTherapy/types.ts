import { MedicalDTO, PatientDTO, TherapyRowDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createTherapy: (therapy: TherapyRowDTO) => any;
  createTherapyReset: () => void;
  getMedicals: () => void;
  getTherapiesByPatientId: (ptaientCode: number | undefined) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TherapyTransitionState = "IDLE" | "TO_RESET";
