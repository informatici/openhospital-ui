import { TFields } from "../../../libraries/formDataHandling/types";
import { BillFilterFormFieldName } from "./types";

export const initialFields: TFields<BillFilterFormFieldName> = {
  user: {
    value: "",
    type: "text",
    options: [],
  },
  patient: {
    value: "",
    type: "text",
    options: [],
  },
  billItem: {
    value: "",
    type: "text",
    options: [],
  },
  affiliate: {
    value: "",
    type: "text",
    options: [],
  },
  fromDate: {
    value: new Date().setHours(0) + "",
    type: "date",
  },
  toDate: {
    value: new Date().setHours(23) + "",
    type: "date",
  },
};
