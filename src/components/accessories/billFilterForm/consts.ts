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
  startDate: {
    value: "",
    type: "date",
  },
  endDate: {
    value: "",
    type: "date",
  },
};
