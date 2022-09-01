import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TherapyFormFieldName } from "./therapyForm/types";

export const initialFields: TFields<TherapyFormFieldName> = {
  medicalId: {
    value: "",
    type: "text",
    options: [],
  },
  qty: {
    value: "1",
    type: "number",
  },
  nbDays: {
    value: "1",
    type: "number",
  },
  nbWeeks: {
    value: "0",
    type: "number",
  },
  nbMonths: {
    value: "0",
    type: "number",
  },
  freqInDay: {
    value: "1",
    type: "number",
  },
  freqInPeriod: {
    value: "1",
    type: "number",
  },
  startDate: {
    value: moment().toISOString(),
    type: "date",
  },
  endDate: {
    value: moment().toISOString(),
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
