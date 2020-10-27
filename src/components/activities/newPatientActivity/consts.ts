import {
  PatientDTOFatherEnum,
  // PatientDTOBloodTypeEnum,
  PatientDTOHasInsuranceEnum,
  PatientDTOMotherEnum,
  PatientDTOParentTogetherEnum,
  PatientDTOSexEnum,
} from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { TPatientDataFormFieldName } from "../../accessories/patientDataForm/types";

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
    value: PatientDTOSexEnum.M,
    type: "text",
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
  },
  hasInsurance: {
    value: PatientDTOHasInsuranceEnum.Y,
    type: "text",
  },
  parentTogether: {
    value: PatientDTOParentTogetherEnum.Y,
    type: "text",
  },
  taxCode: {
    value: "",
    type: "text",
  },
  height: {
    value: "175",
    type: "number",
  },
  weight: {
    value: "83",
    type: "number",
  },
  blobPhoto: {
    value: "",
    type: "text",
  },
};
