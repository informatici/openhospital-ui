import { TFields } from "../../../libraries/formDataHandling/types";
import { TherapyFormFieldName } from "./therapyForm/types";

export const initialFields: TFields<TherapyFormFieldName> = {
  medicalId: {
    value: "",
    type: "text",
    options: [],
  },
  qty: {
    value: "10",
    type: "number",
  },
  nbDays: {
    value: "10",
    type: "number",
  },
  nbWeeks: {
    value: "10",
    type: "number",
  },
  nbMonths: {
    value: "10",
    type: "number",
  },
  freqInDay: {
    value: "2",
    type: "number",
  },
  freqInPeriod: {
    value: "1",
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
