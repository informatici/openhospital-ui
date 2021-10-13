import {
  BillDTO,
  BillPaymentsDTO,
  FullBillDTO,
  PatientDTO,
} from "../../../generated";
import { IForm } from "../../../libraries/formDataHandling/types";
interface IOwnProps {
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export interface BillItemType {
  value: string;
  label: string;
}

export type TProps = IForm<TBillDataFormFieldName, FullBillDTO> & IOwnProps;
export type TBillDataFormFieldName =
  | "billDate"
  | "listName"
  | "patName"
  | "amount"
  | "balance"
  | "itemDescription"
  | "itemQuantity"
  | "itemAmount"
  | "itemType"
  | "itemCode"
  | "itemId"
  | "paymentDate"
  | "paymentAmount"
  | "paymentType";
