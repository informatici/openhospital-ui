import { FieldInputProps } from "formik";
import {
  InputProps,
  FilledInputProps,
  OutlinedInputProps,
} from "@material-ui/core";

export interface IProps {
  className?: string;
  field: FieldInputProps<any>;
  theme: "light" | "regular";
  label: string;
  type?: string;
  multiline?: boolean;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any) => void;
  disabled?: boolean;
  InputProps?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>;
}
