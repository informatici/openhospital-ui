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
  triageDate: {
    value: "",
    type: "date",
  },
  height: {
    value: "175",
    type: "number",
  },
  weight: {
    value: "83",
    type: "number",
  },
  temperature: {
    value: "36",
    type: "decimal",
  },
  saturation: {
    value: "0",
    type: "decimal",
  },
  arterial_pressure: {
    value: "0 / 0",
    type: "text",
  },
  heart_rate: {
    value: "0",
    type: "decimal",
  },
  diuresis_vol: {
    value: "0",
    type: "decimal",
  },
  respiratory_rate: {
    value: "0",
    type: "decimal",
  },
  hgt: {
    value: "0",
    type: "decimal",
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
