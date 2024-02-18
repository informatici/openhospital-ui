import { OperationRowDTO } from "../../../../generated";
import { IForm } from "../../../../libraries/formDataHandling/types";

interface IOwnProps {
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  addOperationCallback?: () => void;
  operationRowsToEdit?: OperationRowDTO[];
}
export type TProps = IForm<TPatientOPDFormFieldName, any> & IOwnProps;

export type TPatientOPDFormFieldName =
  | "date"
  | "disease"
  | "disease"
  | "disease2"
  | "disease3"
  | "ward"
  | "note"
  | "newPatient"
  | "referralFrom"
  | "referralTo"
  | "prescription";
