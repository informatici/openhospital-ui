import { TFields } from "../../../../libraries/formDataHandling/types";
import { BillItemFormFieldName } from "./types";

export const initialFields: TFields<BillItemFormFieldName> = {
  itemAmount: {
    type: "number",
    value: "0",
  },
  itemQuantity: {
    type: "number",
    value: "1",
  },
  itemId: {
    type: "text",
    value: "",
  },
  itemDescription: {
    type: "text",
    value: "",
  },
};
