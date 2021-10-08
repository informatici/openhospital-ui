import { PatientDTO } from "../../../generated";

export interface IProps {
  fieldName: string;
  fieldValue: string;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>, value: PatientDTO) => void;
  loading?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  options: Array<PatientDTO>;
  theme?: string;
  onInputChange?: (e: any, value: string, criteria: string) => void;
  freeSolo?: boolean;
}

export type TPatientSearchFormFieldName =
  | "patientCode"
  | "address"
  | "firstName"
  | "secondName"
  | "birthDay";
