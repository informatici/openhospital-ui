import { IForm, TFields } from "../../../../libraries/formDataHandling/types";
import { OperationRowFormFieldName } from "../../patientOperation/operationForm/types";

interface IOwnProps {
  creationMode: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  addOperationCallback?: () => void;
  operationsRowFields: TFields<OperationRowFormFieldName>;
}
export type TProps = IForm<TPatientOPDFormFieldName, any> & IOwnProps;

export type TPatientOPDFormFieldName =
  | "visitDate"
  | "disease"
  | "disease2"
  | "disease3"
  | "note"
  | "newPatient"
  | "referralFrom"
  | "referralTo"
  | "prescription";
