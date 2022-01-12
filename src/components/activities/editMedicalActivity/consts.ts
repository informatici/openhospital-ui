import { TFields } from "../../../libraries/formDataHandling/types";
import { TMedicalDataFormFieldName } from "../../accessories/medicalDataForm/types";

export const initialFields: TFields<TMedicalDataFormFieldName> = {
  code: {
    value: "",
    type: "number",
  },
  prod_code: {
    value: "",
    type: "text",
  },
  type: {
    value: "",
    type: "text",
    options: [],
  },
  description: {
    value: "",
    type: "text",
  },
  initialqty: {
    value: "0",
    type: "number",
  },
  pcsperpck: {
    value: "1",
    type: "number",
  },
  inqty: {
    value: "0",
    type: "number",
  },
  outqty: {
    value: "0",
    type: "number",
  },
  minqty: {
    value: "0.0",
    type: "number",
  },
};
