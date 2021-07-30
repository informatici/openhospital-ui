import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./ExamForm/types";

const examOptions = [
  {
    label: "exa1",
    value: "Exam1",
  },
  {
    label: "exa2",
    value: "Exam2",
  },
  {
    label: "exa3",
    value: "Exam3",
  },
];

export const initialFields: TFields<ExamFormFieldName> = {
  examId: {
    value: "",
    type: "text",
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
