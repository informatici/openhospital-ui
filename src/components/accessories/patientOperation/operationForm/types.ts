import { OperationRowDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOperationRowProps {
  fields: TFields<OperationRowFormFieldName>;
  onSubmit: (values: Record<keyof OperationRowDTO, any>) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  opdId?: number;
  admissionId?: number;
  creationMode: boolean;
  resetFormCallback: () => void;
}

export type OperationRowProps = IOperationRowProps;

export type OperationRowFormFieldName =
  | "opDate"
  | "opResult"
  | "operation"
  | "remarks"
  | "transUnit";
