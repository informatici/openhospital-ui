import { FieldInputProps } from "formik";
import { TSelectFieldValues } from '../../../libraries/formDataHandling/types';

export interface IProps {
  field: FieldInputProps<any>;
  theme: "light" | "regular";
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any) => void;
  disabled?: boolean;
  options: TSelectFieldValues;
}
