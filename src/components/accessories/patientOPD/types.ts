import { OpdDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}
export interface IDispatchProps {
  createOpd: (opd: OpdDTO) => any;
  createOpdReset: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState = "IDLE" | "TO_RESET";

export type TPatientOPDFormFieldName =
  | "opdDate"
  | "anamnesis"
  | "opd_1"
  | "opd_2"
  | "opd_3"
  | "note";
