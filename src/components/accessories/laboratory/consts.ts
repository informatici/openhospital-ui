import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./examForm/type";
import { ExamFilterFormFieldName, TFilterValues } from "./filter/types";
import { ExamRequestFormFieldName } from "./examRequestForm/types";

export const initialFilterFields: TFields<ExamFilterFormFieldName> = {
  dateFrom: { type: "date", value: moment().startOf("month").toISOString() },
  dateTo: { type: "date", value: moment().toISOString() },
  examName: { type: "text", value: "" },
  patientCode: { type: "number", value: "" },
  status: { type: "number", value: "-1" },
};

export const initialFilter: TFilterValues = {
  dateFrom: moment().subtract(1, "years").toISOString(),
  dateTo: moment().toISOString(),
  status: -1,
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
  date: {
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
  },
  material: {
    value: "",
    type: "text",
  },
};

export const initialRequestFields: TFields<ExamRequestFormFieldName> = {
  exam: {
    value: "",
    type: "text",
  },
  patientId: {
    value: "",
    type: "number",
  },
  material: {
    value: "",
    type: "text",
  },
};
