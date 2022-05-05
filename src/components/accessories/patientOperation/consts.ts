import { parseDate } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { OperationRowFormFieldName } from "./operationForm/types";

export const initialFields: TFields<OperationRowFormFieldName> = {
  transUnit: {
    value: "0",
    type: "number",
  },
  opDate: {
    value: parseDate(Date.now().toString()),
    type: "date",
  },
  opResult: {
    value: "",
    type: "text",
  },
  operation: {
    value: "",
    type: "text",
    options: [],
  },
  remarks: {
    value: "",
    type: "text",
  },
};
