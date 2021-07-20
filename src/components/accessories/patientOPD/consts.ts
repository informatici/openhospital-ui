import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientOPDFormFieldName } from "./patientOPDForm/types";

export const initialFields: TFields<TPatientOPDFormFieldName> = {
  date: {
    value: "",
    type: "date",
  },
  anamnesis: {
    value: "",
    type: "text",
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
  note: {
    value: "",
    type: "text",
  },
};
