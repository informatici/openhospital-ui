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

export const formFields: TFields<TPatientDataFormFieldName> = {
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
    type: "select",
    options: [{
      label: "Male",
      value: PatientDTOSexEnum.M,
    }, {
      label: "Female",
      value: PatientDTOSexEnum.F,
    }]
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
    type: "select",
    options: [{
      label: "0-",
      value: "0-",
    }, {
      label: "0+",
      value: "0+",
    }, {
      label: "A-",
      value: "A-",
    }, {
      label: "A+",
      value: "A+",
    }, {
      label: "B-",
      value: "B-",
    }, {
      label: "B+",
      value: "B+",
    }, {
      label: "AB-",
      value: "AB-",
    }, {
      label: "AB+",
      value: "AB+",
    }]
  },
  hasInsurance: {
    value: "",
    type: "select",
    options: [{
      label: "Yes",
      value: PatientDTOHasInsuranceEnum.Y
    }, {
      label: "No",
      value: PatientDTOHasInsuranceEnum.N
    }]
  },
  parentTogether: {
    value: "",
    type: "select",
    options: [{
      label: "Yes",
      value: PatientDTOParentTogetherEnum.Y
    }, {
      label: "No",
      value: PatientDTOParentTogetherEnum.N
    }]
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
