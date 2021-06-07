import { IForm } from "../../../../libraries/formDataHandling/types";

export type TProps = IForm<TPatientOPDFormFieldName, any>;

export type TPatientOPDFormFieldName =
  | "opdDate"
  | "anamnesis"
  | "opd_1"
  | "opd_2"
  | "opd_3"
  | "note";
