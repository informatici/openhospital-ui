import { AdmissionDTO } from "../../../../generated";
import { parseDate } from "../../../../libraries/formDataHandling/functions";
import { TFields } from "../../../../libraries/formDataHandling/types";
import { TCurrentAdmissionFieldName } from "./types";

export const initialFields = (
  patient: AdmissionDTO | undefined
): TFields<TCurrentAdmissionFieldName> => {
  return {
    ward: {
      value: "",
      type: "text",
      options: [],
    },
    transUnit: {
      value: "10",
      type: "number",
    },
    fhu: {
      value: "",
      type: "text",
    },
    admDate: {
      value: parseDate(Date.now().toString()),
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
};
