import { OpdDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}
export interface IDispatchProps {
  createOpd: (opd: OpdDTO) => any;
  createOpdReset: () => void;
  getDiseasesAll: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type TActivityTransitionState = "IDLE" | "TO_RESET";

export type TPatientOPDFormFieldName =
  | "date"
  | "anamnesis"
  | "disease"
  | "disease2"
  | "disease3"
  | "note";
