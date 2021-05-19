import { PatientDTO, TherapyRowDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createTherapy: (therapy: TherapyRowDTO) => any;
  createTherapyReset: () => void;
}

export type TProps = IStateProps &
  IDispatchProps & { patient: PatientDTO | undefined };

export type TherapyTransitionState = "IDLE" | "TO_RESET";
