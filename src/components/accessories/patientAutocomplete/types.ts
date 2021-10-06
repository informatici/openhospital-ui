import { PatientDTO } from "../../../generated";

export interface IProps {
  fieldName: string;
  fieldValue: number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: any) => void;
  loading?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  options: Array<PatientDTO>;
  theme?: string;
  onInputChange?: (e: any, value: string, criteria: string) => void;
  freeSolo?: boolean;
}
