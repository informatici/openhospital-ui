import { TFields } from "../../../libraries/formDataHandling/types";
import { OperationRowFormFieldName } from "./operationForm/types";

export const initialFields: TFields<OperationRowFormFieldName> = {
  transUnit: {
    value: "0",
    type: "number",
  },
  opDate: {
    value: new Date(Date.now()).toISOString(),
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
