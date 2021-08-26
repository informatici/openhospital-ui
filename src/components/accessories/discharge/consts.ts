import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";

const dischargeTypeOptions = [
  {
    label: "Typ1",
    value: "Type1",
  },
  {
    label: "Typ2",
    value: "Type2",
  },
];

const diseaseTypeOptions = [
  {
    label: "disease1",
    value: "Malaria",
  },
  {
    label: "disease2",
    value: "Hepathite",
  },
];

export const initialFields: TFields<DischargeFormFieldName> = {
  disDate: {
    value: "",
    type: "date",
  },
  disType: {
    value: "",
    type: "text",
    options: dischargeTypeOptions,
  },
  bedDays: {
    value: "10",
    type: "number",
  },
  diseaseOut1: {
    value: "",
    type: "text",
    options: diseaseTypeOptions,
  },
  diseaseOut2: {
    value: "",
    type: "text",
    options: diseaseTypeOptions,
  },
  diseaseOut3: {
    value: "",
    type: "text",
    options: diseaseTypeOptions,
  },
  cliDiaryCharge: {
    value: "",
    type: "text",
  },
  imageryCharge: {
    value: "",
    type: "text",
  },
};
