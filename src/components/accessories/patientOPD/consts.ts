import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientOPDFormFieldName } from "./patientOPDForm/types";

export const initialFields: TFields<TPatientOPDFormFieldName> = {
  visitDate: {
    value: "",
    type: "date",
  },
  disease: {
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
  reasons: {
    value: "",
    type: "text",
  },
  anamnesis: {
    value: "",
    type: "text",
  },
  allergies: {
    value: "",
    type: "text",
  },
  prescriptions: {
    value: "",
    type: "text",
  },
  therapies: {
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
};
