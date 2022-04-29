import {
  PatientDTOFatherEnum,
  PatientDTOMotherEnum,
  PatientDTOSexEnum,
} from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientDataFormFieldName } from "../../accessories/patientDataForm/types";

const sexOptions = [
  {
    label: "common.male",
    value: PatientDTOSexEnum.M,
  },
  {
    label: "common.female",
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
    label: "common.yes",
    value: "Y",
  },
  {
    label: "common.no",
    value: "N",
  },
];

const yesOrNoOrUnknownOptions = [
  {
    label: "common.yes",
    value: "Y",
  },
  {
    label: "common.no",
    value: "N",
  },
  {
    label: "common.unknown",
    value: "U",
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
  height: {
    value: "",
    type: "number",
  },
  weight: {
    value: "",
    type: "number",
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
    value: "N",
    type: "text",
    options: yesOrNoOptions,
  },
  parentTogether: {
    value: "U",
    type: "text",
    options: yesOrNoOrUnknownOptions,
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
