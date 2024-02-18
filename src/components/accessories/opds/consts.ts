import moment from "moment";
import {
  fixFilterDateFrom,
  fixFilterDateTo,
} from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { OpdFilterFormFieldName, TFilterValues } from "./filter/types";

export const initialFilterFields: TFields<OpdFilterFormFieldName> = {
  ageFrom: { type: "number", value: "" },
  ageTo: { type: "number", value: "" },
  dateFrom: {
    type: "date",
    value: moment().subtract(1, "years").toISOString(),
  },
  dateTo: { type: "date", value: moment().toISOString() },
  diseaseCode: { type: "text", value: "" },
  diseaseTypeCode: { type: "text", value: "" },
  sex: { type: "text", value: "" },
  newPatient: { type: "text", value: "" },
  patientCode: { type: "number", value: "" },
  wardCode: { type: "text", value: "" },
};

export const initialFilter: TFilterValues = {
  dateFrom: fixFilterDateFrom(moment().subtract(1, "years").toISOString()),
  dateTo: fixFilterDateTo(moment().toISOString()),
  page: 0,
  size: 80,
};
