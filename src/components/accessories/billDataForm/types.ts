import {
  BillDTO,
  BillItemsDTO,
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
  itemCreationMode: boolean;
  paymentCreationMode: Boolean;
  itemToEdit: BillItemsDTO;
  paymentToEdit: BillPaymentsDTO;
  setItemCreationMode: (mode: boolean) => void;
  setPaymentCreationMode: (mode: boolean) => void;
  billItemsDTO: BillItemsDTO[];
  setBillItemsDTO: (items: BillItemsDTO[]) => void;
  billPaymentsDTO: BillPaymentsDTO[];
  setBillPaymentsDTO: (payments: BillItemsDTO[]) => void;
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
  | "itemId";
export type TBillPaymentDataFormFieldName = "date" | "amount" | "paymentType";
export type TBillDataFormFieldName =
  | "date"
  | "listId"
  | "patId"
  | "amount"
  | "balance";
