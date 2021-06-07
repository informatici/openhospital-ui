import { IForm } from "../../../../libraries/formDataHandling/types";

export type TProps = IForm<TPatientOPDFormFieldName, any>;

export type TPatientOPDFormFieldName =
  | "date"
  | "anamnesis"
  | "disease"
  | "disease2"
  | "disease3"
  | "note";
