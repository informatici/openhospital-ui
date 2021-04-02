import { IForm } from "../../../../libraries/formDataHandling/types";

export type TProps = IForm<TPatientTriageFormFieldName, any>;

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
  
