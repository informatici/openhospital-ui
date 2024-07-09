import { MedicalTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IMedicalTypeFormProps {
  fields: TFields<MedicalTypeFormFieldName>;
  onSubmit: (adm: MedicalTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type MedicalTypeFormFieldName = "code" | "description";
