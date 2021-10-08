import { BillDTO, PatientDTO } from "../../../generated";
import { IForm } from "../../../libraries/formDataHandling/types";
interface IOwnProps {
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export interface BillItemType {
  value: string;
  label: string;
}

export type TProps = IForm<TBillDataFormFieldName, BillDTO> & IOwnProps;

export type TBillDataFormFieldName =
  | "id"
  | "list"
  | "listId"
  | "patient"
  | "patientDTO"
  | "date"
  | "update"
  | "listName"
  | "patName"
  | "status"
  | "amount"
  | "balance"
  | "user";
