import { ConditioningDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  newConditioning: (adm: ConditioningDTO) => any;
  newConditioningReset: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type ConditioningTransitionState = "IDLE" | "TO_RESET" | "FAIL";
