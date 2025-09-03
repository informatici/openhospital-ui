import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "libraries/formDataHandling/types";
import { ConditioningFormFieldName } from "./conditioningForm/types";

export const initialFields: TFields<ConditioningFormFieldName> = {
  aspiration: {
    value: "",
    type: "boolean",
  },
  mceDuree: {
    value: "",
    type: "number",
  },
  ventilationDuree: {
    value: "",
    type: "number",
  },
  oxygeneDebit: {
    value: "",
    type: "number",
  },
  sgVolume: {
    value: "",
    type: "number",
  },
  diazepamDose: {
    value: "",
    type: "number",
  },
  bolusSsVolume: {
    value: "",
    type: "number",
  },
  sngNumero: {
    value: "",
    type: "text",
  },
  others: {
    value: "",
    type: "text",
  },
  date: {
    value: parseDateTime(new Date().toISOString(), false),
    type: "date",
  },
};
