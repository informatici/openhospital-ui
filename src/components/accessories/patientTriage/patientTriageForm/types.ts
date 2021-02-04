import { TFields } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  fields: TFields<TPatientTriageFormFieldName>;
  onSubmit: (triage: any) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
}

export type TProps = IOwnProps;

export type TPatientTriageFormFieldName =
  | "triageDate"
  | "height"
  | "weight"
  | "temperature"
  | "saturation"
  | "arterial_pressure_min"
  | "arterial_pressure_max"
  | "heart_rate"
  | "diuresis_vol"
  | "respiratory_rate"
  | "hgt"
  | "diuresis"
  | "bowel"
  | "auscultation";
  
