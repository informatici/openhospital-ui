import { AgeTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IAgeTypeFormProps {
  fields: TFields<AgeTypeFormFieldName>;
  onSubmit: (adm: AgeTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type AgeTypeFormFieldName = "code" | "description";
