import { PregnantTreatmentTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IPregnantTreatmentTypeFormProps {
  fields: TFields<PregnantTreatmentTypeFormFieldName>;
  onSubmit: (adm: PregnantTreatmentTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type PregnantTreatmentTypeFormFieldName = "code" | "description";
