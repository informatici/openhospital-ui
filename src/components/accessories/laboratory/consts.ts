import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./examForm/type";
import { ExamFilterFormFieldName } from "./filter/types";

export const initialFilterFields: TFields<ExamFilterFormFieldName> = {
  dateFrom: { type: "date", value: "" },
  dateTo: { type: "date", value: "" },
  examName: { type: "text", value: "" },
};

export const initialFields: TFields<ExamFormFieldName> = {
  exam: {
    value: "",
    type: "text",
  },
  patientCode: {
    value: "",
    type: "number",
  },
  examDate: {
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
  },
  material: {
    value: "",
    type: "text",
  },
};
