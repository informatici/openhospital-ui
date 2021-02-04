import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientOPDFormFieldName } from "./patientOPDForm/types";

export const initialFields: TFields<TPatientOPDFormFieldName> = {
  opdDate: {
    value: "",
    type: "date",
  },
  anamnesis: {
    value: "",
    type: "text",
  },
  opd_1: {
    value: "",
    type: "text",
  },
  opd_2: {
    value: "",
    type: "text",
  },
  opd_3: {
    value: "",
    type: "text",
  },
  note: {
    value: "",
    type: "text",
  }
};
