import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./ExamForm/types";

const examsOptions = [
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

const resultsOptions = [
  {
    label: "result1",
    value: "Positive",
  },
  {
    label: "result2",
    value: "Negative",
  },
];

const typeOptions = [
  {
    label: "OPD",
    value: "1",
  },
  {
    label: "IPD",
    value: "0",
  },
];
const materialOptions = [
  {
    label: "mat1",
    value: "Blood",
  },
  {
    label: "mat2",
    value: "Urine",
  },
  {
    label: "mat3",
    value: "Crachat",
  },
];

export const initialFields: TFields<ExamFormFieldName> = {
  exam: {
    value: "",
    type: "text",
    options: examsOptions,
  },
  date: {
    value: "",
    type: "text",
  },
  note: {
    value: "",
    type: "text",
  },
  result: {
    value: "",
    type: "text",
    options: resultsOptions,
  },
  type: {
    value: "",
    type: "text",
    options: typeOptions,
  },
  material: {
    value: "",
    type: "text",
    options: materialOptions,
  },
};
