import { IForm } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}
export type TProps = IForm<TPatientOPDFormFieldName, any> & IOwnProps;

export type TPatientOPDFormFieldName =
  | "visitDate"
  | "disease"
  | "disease2"
  | "disease3"
  | "reasons"
  | "anamnesis"
  | "allergies"
  | "therapies"
  | "prescriptions"
  | "newPatient"
  | "referralFrom"
  | "referralTo";
