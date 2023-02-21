import { PatientDTO } from "../../../generated";

export interface IProps {
  initialValue?: PatientDTO;
  fieldName: string;
  fieldValue: number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>, value: PatientDTO) => void;
  theme?: string;
  enableFocus?: boolean;
}
export type TPatientSearchFormFieldName =
  | "id"
  | "address"
  | "firstName"
  | "secondName"
  | "birthDate";
