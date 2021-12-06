import { BillItemsDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IBillItemProps {
  fields: TFields<BillItemFormFieldName>;
  items: BillItemsDTO[];
  onSubmit: (item: BillItemsDTO) => void;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type BillItemProps = IBillItemProps;

export type BillItemFormFieldName =
  | "itemId"
  | "itemDescription"
  | "itemQuantity"
  | "itemAmount";
