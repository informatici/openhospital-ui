import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";

export const initialFields: TFields<DischargeFormFieldName> = {
  disDate: {
    value: parseDateTime(Date.now().toString(), false),
    type: "date",
  },
  disType: {
    value: "",
    type: "text",
    options: [],
  },
  bedDays: {
    value: "0",
    type: "number",
  },
  diseaseOut1: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut2: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut3: {
    value: "",
    type: "text",
    options: [],
  },
  anamnesis: {
    value: "",
    type: "text",
  },
};
