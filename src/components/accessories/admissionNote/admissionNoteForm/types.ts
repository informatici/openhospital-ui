import { AdmissionDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IAdmissionProps {
  fields: TFields<AdmissionNoteFormFieldName>;
  onSubmit: (adm: AdmissionDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type AdmissionProps = IAdmissionProps;

export type AdmissionNoteFormFieldName = "note";
