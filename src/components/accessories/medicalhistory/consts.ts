import { parseDateTime } from "libraries/formDataHandling/functions";
import { TFields } from "../../../libraries/formDataHandling/types";
import { MedicalHistoryFormFieldName } from "./medicalHistoryForm/types";

export const initialFields: TFields<MedicalHistoryFormFieldName> = {
  lastTransfusionDate: {
    value: parseDateTime(new Date().toISOString(), false),
    type: "date",
  },
  siblingRank: {
    value: "",
    type: "text",
  },
  termPregnancy: {
    value: "",
    type: "text",
  },
  deliveryMode: {
    value: "",
    type: "text",
  },
  reasonMode: {
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
  vaccinationStatePev: {
    value: "",
    type: "text",
  },
  vaccinationStateNoPev: {
    value: "",
    type: "text",
  },
  antiMalarialProphylaxisVap: {
    value: "",
    type: "text",
  },
  antiMalarialProphylaxisMilda: {
    value: "",
    type: "text",
  },
  antiMalarialProphylaxisOthers: {
    value: "",
    type: "text",
  },
  surgicalProcedure: {
    value: "",
    type: "boolean",
  },
  surgicalProcedureCondition: {
    value: "",
    type: "text",
  },
  surgicalProcedureType: {
    value: "",
    type: "text",
  },
  surgicalProcedureDate: {
    value: "",
    type: "date",
  },
  diversification: {
    value: "",
    type: "text",
  },
  neonatalPeriod: {
    value: "",
    type: "text",
  },
  previousHospitalization: {
    value: "",
    type: "text",
  },
  father: {
    value: "",
    type: "text",
  },
  mother: {
    value: "",
    type: "text",
  },
  siblings: {
    value: "",
    type: "text",
  },
  otherUsefulInformation: {
    value: "",
    type: "text",
  },
  diet: {
    value: "",
    type: "text",
  },
  deParasitization: {
    value: "",
    type: "text",
  },
  psychomotorDev: {
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
  allergyPrecision: {
    value: "",
    type: "text",
  },
  hemylosis: {
    value: "",
    type: "text",
  },
  otherPersonalPathologies: {
    value: "",
    type: "text",
  },
  otherFamilyPathologies: {
    value: "",
    type: "text",
  },
  performedAt: {
    value: "",
    type: "date",
  },
};
