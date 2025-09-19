import { MedicalHistoryDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createMedicalHistory: (mh: MedicalHistoryDTO) => any;
  createMedicalHistoryReset: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type MedicalHistoryTransitionState = "IDLE" | "TO_RESET" | "FAIL";
