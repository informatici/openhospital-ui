import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./ExamForm/types";
import { LaboratoryDTOStatusEnum } from "../../../generated";

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

const examStatusOptions = Object.values(LaboratoryDTOStatusEnum).map(
  (status) => {
    return { label: status as string, value: status as string };
  }
);

export const initialFields: TFields<ExamFormFieldName> = {
  exam: {
    value: "",
    type: "text",
    options: examsOptions,
  },
  labDate: {
    value: moment().toISOString(),
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
  status: {
    value: "",
    type: "text",
    options: examStatusOptions,
  },
  material: {
    value: "",
    type: "text",
    options: materialOptions,
  },
};
