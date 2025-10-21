import { AdmissionDTO } from "../../../../generated";
import { parseDate } from "../../../../libraries/formDataHandling/functions";
import { TFields } from "../../../../libraries/formDataHandling/types";
import { TCurrentAdmissionFieldName } from "./types";

export const initialFields = (
  admission: AdmissionDTO | undefined
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
    anamnesis: {
      value: "",
      type: "text",
    },
    preTreatment: {
      value: "",
      type: "text",
    },
    preAssessment: {
      value: "",
      type: "text",
    },
    entryReason: {
      value: "",
      type: "text",
    },
    alertReceived: {
      value: "",
      type: "boolean",
    },
    referenceSheet: {
      value: "",
      type: "boolean",
    },
    qualifiedAgent: {
      value: "",
      type: "boolean",
    },
  };
};
