import { OperationRowDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOperationRowProps {
  fields: TFields<OperationRowFormFieldName>;
  onSubmit: (values: Record<keyof OperationRowDTO, any>) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  /**
   * Set to true if the operation row is in opd context
   */
  opd?: boolean;
  admissionId?: number;
  creationMode: boolean;
  resetFormCallback: () => void;
  hideResultField?: boolean;
}

export type OperationRowProps = IOperationRowProps;

export type OperationRowFormFieldName =
  | "opDate"
  | "opResult"
  | "operation"
  | "remarks"
  | "transUnit";
