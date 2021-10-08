import { PatientDTO } from "../../../generated";

export interface IProps {
  fieldName: string;
  fieldValue: number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>, value: PatientDTO) => void;
  theme?: string;
}
export type TPatientSearchFormFieldName =
  | "id"
  | "address"
  | "firstName"
  | "secondName"
  | "birthDate";
