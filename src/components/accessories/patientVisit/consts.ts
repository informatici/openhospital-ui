import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientVisitFormFieldName } from "./patientVisitForm/types";

export const initialFields: TFields<TPatientVisitFormFieldName> = {
  date: {
    value: "",
    type: "date",
  },
  patient: {
    value: "",
    type: "text",
    options: [
      {
        label: "John Doe",
        value: "jdoe",
      },
    ],
  },
  ward: {
    value: "",
    type: "text",
    options: [
      {
        label: "Medecine",
        value: "M",
      },
    ],
  },
  service: {
    value: "",
    type: "text",
  },
  duration: {
    value: "",
    type: "text",
  },
};
