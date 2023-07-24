import moment from "moment";
import { TFields } from "../../../libraries/formDataHandling/types";
import { OpdFilterFormFieldName } from "./filter/types";

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
