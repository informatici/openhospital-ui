import { PatientDTO } from "../../../generated";
import { IForm } from "../../../libraries/formDataHandling/types";
interface IOwnProps {
  profilePicture?: any;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  mode: "create" | "edit";
}

export type TAgeFieldName = "age" | "agetype" | "birthDate";

export type TProps = IForm<TPatientDataFormFieldName, PatientDTO> & IOwnProps;

export type TPatientDataFormFieldName =
  | "firstName"
  | "secondName"
  | "birthDate"
  | "age"
  | "agetype"
  | "sex"
  | "address"
  | "city"
  | "telephone"
  | "note"
  | "motherName"
  | "mother"
  | "fatherName"
  | "father"
  | "bloodType"
  | "hasInsurance"
  | "parentTogether"
  | "taxCode"
  | "blobPhoto";
