import { SummaryDataType } from "../../../state/summary/types";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
  summaryData: SummaryDataType[] | undefined;
}

export interface IDispatchProps {
  loadSummaryData: (code: number) => void;
}

export type TProps = IStateProps & IDispatchProps;

export type SummaryTransitionState = "IDLE";

export enum SummaryType {
  VISIT = "visit",
  OPD = "opd",
  THERAPY = "therapy",
  TRIAGE = "triage",
}
