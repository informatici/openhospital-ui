import { OperationDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface IOperationProps {
  fields: TFields<OperationFormFieldName>;
  onSubmit: (adm: OperationDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type OperationFormFieldName = "code" | "description" | "type" | "major";
