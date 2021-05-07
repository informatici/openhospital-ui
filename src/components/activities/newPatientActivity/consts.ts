import {
  PatientDTOFatherEnum,
  PatientDTOMotherEnum,
  PatientDTOSexEnum,
} from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientDataFormFieldName } from "../../accessories/patientDataForm/types";

const sexOptions = [
  {
    label: "Male",
    value: PatientDTOSexEnum.M,
  },
  {
    label: "Female",
    value: PatientDTOSexEnum.F,
  },
];

const bloodTypeOptions = [
  {
    label: "0-",
    value: "0-",
  },
  {
    label: "0+",
    value: "0+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
];

const yesOrNoOptions = [
  {
    label: "Yes",
    value: "Y",
  },
  {
    label: "No",
    value: "N",
  },
];

export const initialFields: TFields<TPatientDataFormFieldName> = {
  firstName: {
    value: "",
    type: "text",
  },
  secondName: {
    value: "",
    type: "text",
  },
  birthDate: {
    value: "",
    type: "date",
  },
  age: {
    value: "28",
    type: "number",
  },
  agetype: {
    value: "",
    type: "text",
  },
  sex: {
    value: "",
    type: "text",
    options: sexOptions,
  },
  address: {
    value: "",
    type: "text",
  },
  city: {
    value: "",
    type: "text",
  },
  telephone: {
    value: "",
    type: "text",
  },
  note: {
    value: "",
    type: "text",
  },
  mother_name: {
    value: "",
    type: "text",
  },
  mother: {
    value: PatientDTOMotherEnum.A,
    type: "text",
  },
  father_name: {
    value: "",
    type: "text",
  },
  father: {
    value: PatientDTOFatherEnum.A,
    type: "text",
  },
  bloodType: {
    value: "",
    type: "text",
    options: bloodTypeOptions,
  },
  hasInsurance: {
    value: "",
    type: "text",
    options: yesOrNoOptions,
  },
  parentTogether: {
    value: "",
    type: "text",
    options: yesOrNoOptions,
  },
  taxCode: {
    value: "",
    type: "text",
  },
  blobPhoto: {
    value: "",
    type: "text",
  },
};
