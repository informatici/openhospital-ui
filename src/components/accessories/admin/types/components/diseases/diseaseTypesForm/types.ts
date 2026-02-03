import { DiseaseTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IDiseaseTypeFormProps {
  fields: TFields<DiseaseTypeFormFieldName>;
  onSubmit: (adm: DiseaseTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type DiseaseTypeFormFieldName = "code" | "description";
