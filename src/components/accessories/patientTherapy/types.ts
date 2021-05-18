import { TherapyDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createTherapy: (therapy: TherapyDTO) => any;
  createTherapyReset: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TherapyTransitionState = "IDLE" | "TO_RESET";
