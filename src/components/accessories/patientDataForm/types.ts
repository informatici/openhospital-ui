import { PatientDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
interface IOwnProps {
  fields: TFields<TPatientDataFormFieldName>;
  profilePicture?: any;
  onSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
}

export type TProps = IOwnProps;

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
  | "mother_name"
  | "mother"
  | "father_name"
  | "father"
  | "bloodType"
  | "hasInsurance"
  | "parentTogether"
  | "taxCode"
  | "blobPhoto";
