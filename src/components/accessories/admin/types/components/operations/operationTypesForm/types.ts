import { OperationTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IOperationTypeFormProps {
  fields: TFields<OperationTypeFormFieldName>;
  onSubmit: (code: string, adm: OperationTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type OperationTypeFormFieldName = "code" | "description";
