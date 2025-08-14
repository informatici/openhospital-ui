import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientOPDFormFieldName } from "./patientOPDForm/types";

export const initialFields: TFields<TPatientOPDFormFieldName> = {
  date: {
    value: parseDateTime(new Date().toISOString(), false),
    type: "date",
  },
  disease: {
    value: "",
    type: "text",
  },
  ward: {
    value: "",
    type: "text",
  },
  disease2: {
    value: "",
    type: "text",
  },
  disease3: {
    value: "",
    type: "text",
  },
  note: {
    value: "",
    type: "text",
  },
  newPatient: {
    value: "N",
    type: "text",
  },
  referralFrom: {
    value: "",
    type: "text",
  },
  referralTo: {
    value: "",
    type: "text",
  },
  prescription: {
    value: "",
    type: "text",
  },
};
