import { TFields } from "../../../libraries/formDataHandling/types";
import { AdmissionFormFieldName } from "./admissionForm/types";

export const initialFields: TFields<AdmissionFormFieldName> = {
  ward: {
    value: "",
    type: "text",
    options: [],
  },
  transUnit: {
    value: "10",
    type: "number",
  },
  admDate: {
    value: "",
    type: "date",
  },
  admType: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseIn: {
    value: "",
    type: "text",
    options: [],
  },
  note: {
    value: "",
    type: "text",
  },
};
