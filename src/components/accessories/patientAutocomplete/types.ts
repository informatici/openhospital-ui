import { PatientDTO } from "../../../generated";

export interface IProps {
  fieldName: string;
  fieldValue: number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: any) => void;
  disabled?: boolean;
  theme?: string;
  freeSolo?: boolean;
}
