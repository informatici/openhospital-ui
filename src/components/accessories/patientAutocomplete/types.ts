import { PatientDTO } from "../../../generated";

export interface IProps {
  fieldName: string;
  fieldValue: number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: PatientDTO | undefined) => void;
  disabled?: boolean;
  theme?: string;
  freeSolo?: boolean;
}
