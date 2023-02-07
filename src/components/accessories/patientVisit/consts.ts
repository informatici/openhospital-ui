import { parseDate } from "../../../libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientVisitFormFieldName } from "./patientVisitForm/types";

export const initialFields: TFields<TPatientVisitFormFieldName> = {
  date: {
    value: parseDate(Date.now().toString()),
    type: "date",
  },
  ward: {
    value: "",
    type: "text",
    options: [
      {
        label: "MALE WARD",
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
    type: "number",
  },
};
