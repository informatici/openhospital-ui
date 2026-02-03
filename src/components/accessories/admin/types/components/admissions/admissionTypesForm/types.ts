import { AdmissionTypeDTO } from "../../../../../../../generated";
import { TFields } from "../../../../../../../libraries/formDataHandling/types";

export interface IAdmissionTypeFormProps {
  fields: TFields<AdmissionTypeFormFieldName>;
  onSubmit: (adm: AdmissionTypeDTO) => void;
  creationMode: boolean;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type AdmissionTypeFormFieldName = "code" | "description";
