import { DiseaseDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface IDiseaseProps {
  fields: TFields<DiseaseFormFieldName>;
  onSubmit: (adm: DiseaseDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type DiseaseFormFieldName =
  | "code"
  | "description"
  | "diseaseType"
  | "opdInclude"
  | "ipdInInclude"
  | "ipdOutInclude";
