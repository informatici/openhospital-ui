import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  fields: TFields<TPatientOPDFormFieldName>;
  onSubmit: (triage: any) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type TProps = IOwnProps;

export type TPatientOPDFormFieldName =
  | "opdDate"
  | "anamnesis"
  | "opd_1"
  | "opd_2"
  | "opd_3"
  | "note";
  
  
