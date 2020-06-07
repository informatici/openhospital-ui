import { FieldInputProps } from "formik";

export interface IProps {
  className?: string;
  field: FieldInputProps<any>;
  label: string;
  type?: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any) => void;
}
