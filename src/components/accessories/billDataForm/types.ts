import {
  BillDTO,
  BillPaymentsDTO,
  FullBillDTO,
  PatientDTO,
} from "../../../generated";
import { IForm, TFields } from "../../../libraries/formDataHandling/types";
interface IOwnProps {
  shouldResetForm: boolean;
  itemFields: TFields<TBillItemDataFormFieldName>;
  paymentFields: TFields<TBillPaymentDataFormFieldName>;
  addItemButtonLabel: string;
  addPaymentButtonLabel: string;
  handleItemEdit: (row: any) => void;
  handlePaymentEdit: (row: any) => void;
  resetFormCallback: () => void;
}

export interface BillItemType {
  value: string;
  label: string;
}

export type TProps = IForm<TBillDataFormFieldName, FullBillDTO> & IOwnProps;
export type TBillItemDataFormFieldName =
  | "itemDescription"
  | "itemQuantity"
  | "itemAmount"
  | "itemType"
  | "itemCode"
  | "itemId";
export type TBillPaymentDataFormFieldName =
  | "paymentDate"
  | "paymentAmount"
  | "paymentType";
export type TBillDataFormFieldName =
  | "billDate"
  | "listName"
  | "patName"
  | "amount"
  | "balance";
