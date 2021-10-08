import { TFields } from "../../../../libraries/formDataHandling/types";
import { TPatientSearchFormFieldName } from "../types";

export const initialFields: TFields<TPatientSearchFormFieldName> = {
  patientCode: {
    value: "",
    type: "number",
  },
  address: {
    value: "",
    type: "text",
  },
  firstName: {
    value: "",
    type: "text",
  },
  secondName: {
    value: "",
    type: "text",
  },
  birthDay: {
    value: "",
    type: "date",
  },
};
