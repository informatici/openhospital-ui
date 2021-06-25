import { TFields } from "../../../libraries/formDataHandling/types";
import { TherapyFormFieldName } from "./therapyForm/types";

const medicalOptions = [
  {
    label: "Med1",
    value: "Medical1",
  },
  {
    label: "Med2",
    value: "Medical2",
  },
  {
    label: "Med3",
    value: "Medical3",
  },
  {
    label: "Med4",
    value: "Medical4",
  },
  {
    label: "Med5",
    value: "Medical5",
  },
];

export const initialFields: TFields<TherapyFormFieldName> = {
  medicalId: {
    value: "",
    type: "text",
    options: medicalOptions,
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
    value: "sample note",
    type: "text",
  },
};
