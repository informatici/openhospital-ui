import { TFields } from "../../../libraries/formDataHandling/types";
import { TherapyFormFieldName } from "./therapyForm/types";

export const initialFields: TFields<TherapyFormFieldName> = {
  medicalId: {
    value: "",
    type: "text",
    options: [],
  },
  qty: {
    value: "",
    type: "number",
  },
  nbDays: {
    value: "",
    type: "number",
  },
  nbWeeks: {
    value: "",
    type: "number",
  },
  nbMonths: {
    value: "",
    type: "number",
  },
  freqInDay: {
    value: "",
    type: "number",
  },
  freqInPeriod: {
    value: "",
    type: "number",
  },
  startDate: {
    value: "",
    type: "date",
  },
  endDate: {
    value: "",
    type: "date",
  },
  notifyInt: {
    value: "0",
    type: "number",
  },
  smsInt: {
    value: "0",
    type: "number",
  },
  note: {
    value: "",
    type: "text",
  },
};
