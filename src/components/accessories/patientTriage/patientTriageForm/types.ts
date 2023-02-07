import { PatientExaminationDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  fields: TFields<TPatientTriageFormFieldName>;
  onSubmit: (triage: PatientExaminationDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TProps = IOwnProps;

export type TPatientTriageFormFieldName =
  | "pex_date"
  | "pex_height"
  | "pex_weight"
  | "pex_temp"
  | "pex_sat"
  | "pex_ap_min"
  | "pex_ap_max"
  | "pex_rr"
  | "pex_hgt"
  | "pex_hr"
  | "pex_auscultation"
  | "pex_diuresis"
  | "pex_bowel_desc"
  | "pex_note"
  | "pex_diuresis_desc";
