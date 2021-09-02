import { TFields } from "../../../libraries/formDataHandling/types";
import { DischargeFormFieldName } from "./dischargeForm/types";

export const initialFields: TFields<DischargeFormFieldName> = {
  admDate: {
    value: "",
    type: "date",
  },
  disDate: {
    value: "",
    type: "date",
  },
  disType: {
    value: "",
    type: "text",
  },
  bedDays: {
    value: "0",
    type: "number",
  },
  diseaseOut1: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut2: {
    value: "",
    type: "text",
    options: [],
  },
  diseaseOut3: {
    value: "",
    type: "text",
    options: [],
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
