import { IForm } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  shouldResetForm: boolean;
}
export type TProps = IForm<TPatientOPDFormFieldName, any> & IOwnProps;

export type TPatientOPDFormFieldName =
  | "date"
  | "anamnesis"
  | "disease"
  | "disease2"
  | "disease3"
  | "note";
