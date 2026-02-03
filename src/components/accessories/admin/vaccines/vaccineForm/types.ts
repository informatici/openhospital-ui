import { VaccineDTO } from "../../../../../generated";
import { TFields } from "../../../../../libraries/formDataHandling/types";

export interface IVaccineFormProps {
  fields: TFields<VaccineFormFieldName>;
  onSubmit: (adm: VaccineDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type VaccineFormFieldName = "code" | "description" | "vaccineType";
