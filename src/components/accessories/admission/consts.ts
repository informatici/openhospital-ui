import { TFields } from "../../../libraries/formDataHandling/types";
import { AdmissionFormFieldName } from "./admissionForm/types";

const wardOptions = [
  {
    label: "ward1",
    value: "Ward1",
  },
  {
    label: "ward2",
    value: "Ward2",
  },
  {
    label: "ward3",
    value: "Ward3",
  },
];

const admTyOptions = [
  {
    label: "type1",
    value: "Ambulance",
  },
  {
    label: "type2",
    value: "Volontaire",
  },
  {
    label: "type3",
    value: "transfert",
  },
];

const diagnosis = [
  {
    label: "disease1",
    value: "disease",
  },
  {
    label: "disease2",
    value: "disease",
  },
  {
    label: "disease3",
    value: "disease",
  },
];

export const initialFields: TFields<AdmissionFormFieldName> = {
  ward: {
    value: "",
    type: "text",
    options: wardOptions,
  },
  transUnit: {
    value: "10",
    type: "text",
  },
  admDate: {
    value: "",
    type: "date",
  },
  admType: {
    value: "",
    type: "text",
    options: admTyOptions,
  },
  diseaseIn: {
    value: "",
    type: "text",
    options: diagnosis,
  },
};

export const sampleData: Record<string, any>[] = [];
