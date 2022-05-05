import { OperationRowDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOperationRowProps {
  fields: TFields<OperationRowFormFieldName>;
  onSubmit: (values: Record<OperationRowFormFieldName, any>) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  opdId?: number;
  admissionId?: number;
  resetFormCallback: () => void;
}

export type OperationRowProps = IOperationRowProps;

export type OperationRowFormFieldName =
  | "opDate"
  | "opResult"
  | "operation"
  | "remarks"
  | "transUnit";
