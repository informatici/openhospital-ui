import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { ExamFormFieldName } from "./examForm/type";
import { ExamFilterFormFieldName, TFilterValues } from "./filter/types";
import { ExamRequestFormFieldName } from "./examRequestForm/types";
import {
  fixFilterDateFrom,
  fixFilterDateTo,
} from "../../../libraries/formDataHandling/functions";

export const initialFilterFields: TFields<ExamFilterFormFieldName> = {
  dateFrom: { type: "date", value: moment().startOf("month").toISOString() },
  dateTo: { type: "date", value: moment().toISOString() },
  examName: { type: "text", value: "" },
  patientCode: { type: "number", value: "" },
  status: { type: "text", value: "" },
};

export const initialFilter: TFilterValues = {
  dateFrom: fixFilterDateFrom(moment().subtract(1, "years").toISOString()),
  dateTo: fixFilterDateTo(moment().toISOString()),
  status: "",
  page: 0,
  size: 80,
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
