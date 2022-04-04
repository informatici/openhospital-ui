import { IForm } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}
export type TProps = IForm<TPatientVisitFormFieldName, any> & IOwnProps;

export type TPatientVisitFormFieldName =
  | "date"
  | "ward"
  | "duration"
  | "service";
