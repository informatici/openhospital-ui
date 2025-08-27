import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { MedicalHistoryFormFieldName } from "./types";

export const initialFields: TFields<MedicalHistoryFormFieldName> = {
  lastTransfusionDate: {
    value: parseDateTime(new Date().toISOString(), false),
    type: "date",
  },
  siblingRank: {
    value: "",
    type: "number",
  },
  pregnancyTerm: {
    value: "",
    type: "text",
  },
  deliveryMode: {
    value: "",
    type: "text",
  },
  apgarScore: {
    value: "",
    type: "text",
  },
  birthWeight: {
    value: "",
    type: "number",
  },
  vaccinationStatus: {
    value: "",
    type: "text",
  },
  malariaProphylaxis: {
    value: "",
    type: "text",
  },
  diet: {
    value: "",
    type: "text",
  },
  deworming: {
    value: "",
    type: "text",
  },
  psychomotorDevelopment: {
    value: "",
    type: "text",
  },
  somaticGrowth: {
    value: "",
    type: "text",
  },
  ironSupplement: {
    value: "",
    type: "boolean",
  },
  folicAcidSupplement: {
    value: "",
    type: "boolean",
  },
  vitASupplement: {
    value: "",
    type: "boolean",
  },
  otherSupplements: {
    value: "",
    type: "text",
  },

  transfusion: {
    value: "",
    type: "boolean",
  },
  sickleCell: {
    value: "",
    type: "boolean",
  },
  drugAllergy: {
    value: "",
    type: "boolean",
  },
  hemolysis: {
    value: "",
    type: "text",
  },
  otherPathologies: {
    value: "",
    type: "text",
  },

  otherFamilyPathologies: {
    value: "",
    type: "text",
  },
};
