import moment from "moment";
import {
  PatientExaminationDTOPexAuscultationEnum,
  PatientExaminationDTOPexBowelDescEnum,
  PatientExaminationDTOPexDiuresisDescEnum,
} from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientTriageFormFieldName } from "./patientTriageForm/types";

const diuresisOptions = Object.keys(PatientExaminationDTOPexDiuresisDescEnum)
  .filter((v) => isNaN(Number(v)))
  .map((e) => ({ label: e.toLowerCase(), value: e.toLowerCase() }));

const bowelOptions = Object.keys(PatientExaminationDTOPexBowelDescEnum)
  .filter((v) => isNaN(Number(v)))
  .map((e) => ({ label: e.toLowerCase(), value: e.toLowerCase() }));

const auscultationOptions = Object.keys(
  PatientExaminationDTOPexAuscultationEnum
)
  .filter((v) => isNaN(Number(v)))
  .map((e) => ({ label: e.toLowerCase(), value: e.toLowerCase() }));

export const initialFields: TFields<TPatientTriageFormFieldName> = {
  pex_date: {
    value: moment().toISOString(),
    type: "date",
  },
  pex_height: {
    value: "0",
    type: "number",
  },
  pex_weight: {
    value: "0",
    type: "number",
  },
  pex_temp: {
    value: "0",
    type: "number",
  },
  pex_sat: {
    value: "0",
    type: "number",
  },
  pex_ap_min: {
    value: "0",
    type: "number",
  },
  pex_ap_max: {
    value: "0",
    type: "number",
  },
  pex_rr: {
    value: "0",
    type: "number",
  },
  pex_diuresis: {
    value: "0",
    type: "number",
  },
  pex_hr: {
    value: "0",
    type: "number",
  },
  pex_hgt: {
    value: "0",
    type: "number",
  },
  pex_diuresis_desc: {
    value: "",
    type: "text",
    options: diuresisOptions,
  },
  pex_bowel_desc: {
    value: "",
    type: "text",
    options: bowelOptions,
  },
  pex_auscultation: {
    value: "",
    type: "text",
    options: auscultationOptions,
  },
  pex_note: {
    value: "",
    type: "text",
  },
};
