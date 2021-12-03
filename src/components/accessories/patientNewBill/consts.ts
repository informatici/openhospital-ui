import { BillItemFormFieldName } from "./itemPicker/types";
import { TFields } from "../../../libraries/formDataHandling/types";

export const ItemGroups = {
  medical: "MED",
  surgery: "OPE",
  other: "CST",
  exam: "EXA",
};

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
