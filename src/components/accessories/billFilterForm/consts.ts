import { TFields } from "../../../libraries/formDataHandling/types";
import { BillFilterFormFieldName } from "./types";

export const initialFields: TFields<BillFilterFormFieldName> = {
  patient: {
    value: "",
    type: "text",
    options: [],
  },
  fromDate: {
    value: "",
    type: "date",
  },
  toDate: {
    value: "",
    type: "date",
  },
};
