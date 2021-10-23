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
    type: "text",
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
  disDate: {
    value: "",
    type: "date",
  },
  disType: {
    value: "",
    type: "text",
  },
  bedDays: {
    value: "0",
    type: "number",
  },
  diseaseOut1: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut2: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut3: {
    value: "",
    type: "text",
    options: [],
  },
  cliDiaryCharge: {
    value: "",
    type: "text",
  },
  imageryCharge: {
    value: "",
    type: "text",
  },
};
