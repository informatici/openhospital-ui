import { BillItemsDTO } from "../../../../generated";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IBillItemProps {
  fields: TFields<BillItemFormFieldName>;
  items: BillItemsDTO[];
  itemToEdit: Record<string, any> | undefined;
  onSubmit: (item: BillItemsDTO, isNew: boolean) => void;
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
