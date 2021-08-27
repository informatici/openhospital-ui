import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";

const dischargeTypeOptions = [
  {
    label: "Type 1",
    value: "disType",
  },
  {
    label: "Type 2",
    value: "disType",
  },
];

const diagnosis = [
  {
    label: "Disease 1",
    value: "disease",
  },
  {
    label: "Disease 2",
    value: "disease",
  },
  {
    label: "Disease 3",
    value: "disease",
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
    options: diagnosis,
  },
  diseaseOut2: {
    value: "",
    type: "text",
    options: diagnosis,
  },
  diseaseOut3: {
    value: "",
    type: "text",
    options: diagnosis,
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
