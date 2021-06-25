import { PatientExaminationDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  fields: TFields<TPatientTriageFormFieldName>;
  onSubmit: (triage: PatientExaminationDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
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
  | "pex_pa_min"
  | "pex_pa_max"
  | "pex_fc"
  | "diuresis_vol"
  | "respiratory_rate"
  | "hgt"
  | "diuresis"
  | "bowel"
  | "auscultation";
