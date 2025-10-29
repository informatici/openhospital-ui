import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "libraries/formDataHandling/types";
import { ConditioningFormFieldName } from "./conditioningForm/types";

export const initialFields: TFields<ConditioningFormFieldName> = {
  aspiration: {
    value: "",
    type: "boolean",
  },
  cpap: {
    value: "",
    type: "boolean",
  },
  mce: {
    value: "",
    type: "number",
  },
  ventilation: {
    value: "",
    type: "number",
  },
  oxygenDebit: {
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
  sngNumber: {
    value: "",
    type: "text",
  },
  others: {
    value: "",
    type: "text",
  },
  performedAt: {
    value: parseDateTime(new Date().toISOString(), false),
    type: "date",
  },
  conditionAtAdmission: {
    value: [],
    type: "array",
  },
  malaria: {
    value: "",
    type: "text",
  },
  bloodGlucoseLevel: {
    value: "",
    type: "number",
  },
  performedBy: {
    value: "",
    type: "text",
    options: [],
  },
  hivTest: {
    value: "",
    type: "text",
  },
};
