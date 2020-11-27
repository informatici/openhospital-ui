import { PatientDTO } from "../../../generated";
import { TFields } from "../../../libraries/formDataHandling/types";
import { IApiResponse } from "../../../state/types";

interface IOwnProps {
  fields: TFields<TPatientDataFormFieldName>;
  profilePicture?: any;
  onSubmit: (patient: PatientDTO) => void;
  submitButtonLabel: string;
  isLoading: boolean;
  editMode?: boolean;
  patient?: IApiResponse<PatientDTO>;
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
  | "height"
  | "weight"
  | "blobPhoto";
