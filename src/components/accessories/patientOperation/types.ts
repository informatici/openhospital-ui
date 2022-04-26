import { OperationRowDTO } from "../../../generated";

export interface IStateProps {
  isLoading: boolean;
  hasSucceeded: boolean;
  hasFailed: boolean;
}

export interface IDispatchProps {
  createOperationRow: (ope: OperationRowDTO) => any;
  createOperationRowReset: () => void;
  getOperationRows: () => void;
}

export type TProps = IStateProps & IDispatchProps;

export type OperationRowTransitionState = "IDLE" | "TO_RESET" | "FAIL";
