import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";

export const initialFields: TFields<DischargeFormFieldName> = {
  disDate: {
    value: new Date(Date.now()).toISOString(),
    type: "date",
  },
  disType: {
    value: "",
    type: "text",
  },
  bedDays: {
    value: "0",
    type: "number",
  },
  diseaseOut: {
    value: "",
    type: "text",
    options: [],
  },
  cliDiaryCharge: {
    value: "",
    type: "text",
  },
  imageryCharge: {
    value: "",
    type: "text",
  },
  note: {
    value: "",
    type: "text",
  },
};
