import { FieldInputProps } from "formik";
import {
  InputProps,
  FilledInputProps,
  OutlinedInputProps,
} from "@mui/material";
import { FIELD_VALIDATION } from "../../../types";

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
  rows?: number;
  required?: FIELD_VALIDATION;
  maxLength?: number;
}
