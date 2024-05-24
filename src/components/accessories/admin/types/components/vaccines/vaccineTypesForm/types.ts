import { VaccineTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IVaccineTypeFormProps {
  fields: TFields<VaccineTypeFormFieldName>;
  onSubmit: (adm: VaccineTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type VaccineTypeFormFieldName = "code" | "description";
