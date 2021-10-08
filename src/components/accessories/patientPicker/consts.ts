import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientSearchFormFieldName } from "./types";

export const initialFields: TFields<TPatientSearchFormFieldName> = {
  id: {
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
  birthDate: {
    value: "",
    type: "date",
  },
};
