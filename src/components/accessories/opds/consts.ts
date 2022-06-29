import { TFields } from "../../../libraries/formDataHandling/types";
import { OpdFilterFormFieldName } from "./filter/types";

export const initialFilterFields: TFields<OpdFilterFormFieldName> = {
  ageFrom: { type: "number", value: "" },
  ageTo: { type: "number", value: "" },
  dateFrom: { type: "date", value: "" },
  dateTo: { type: "date", value: "" },
  diseaseCode: { type: "text", value: "" },
  diseaseTypeCode: { type: "text", value: "" },
  sex: { type: "text", value: "" },
  newPatient: { type: "text", value: "" },
  patientCode: { type: "number", value: "" },
};
