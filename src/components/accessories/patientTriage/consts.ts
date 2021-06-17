import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientTriageFormFieldName } from "./patientTriageForm/types";

const diuresisOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

const bowelOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

const auscultationOptions = [
  {
    label: "Item 1",
    value: "Item 1",
  },
  {
    label: "Item 2",
    value: "Item 2",
  },
];

export const initialFields: TFields<TPatientTriageFormFieldName> = {
  pex_date: {
    value: "",
    type: "date",
  },
  pex_height: {
    value: "175",
    type: "number",
  },
  pex_weight: {
    value: "83",
    type: "number",
  },
  pex_temp: {
    value: "36",
    type: "number",
  },
  pex_sat: {
    value: "0",
    type: "number",
  },
  pex_pa_min: {
    value: "0",
    type: "number",
  },
  pex_pa_max: {
    value: "0",
    type: "number",
  },
  pex_fc: {
    value: "0",
    type: "number",
  },
  diuresis_vol: {
    value: "0",
    type: "number",
  },
  respiratory_rate: {
    value: "0",
    type: "number",
  },
  hgt: {
    value: "0",
    type: "number",
  },
  diuresis: {
    value: "",
    type: "text",
    options: diuresisOptions,
  },
  bowel: {
    value: "",
    type: "text",
    options: bowelOptions,
  },
  auscultation: {
    value: "",
    type: "text",
    options: auscultationOptions,
  },
};
