import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
} from "@material-ui/core";

export interface IProps {
  className?: string;
  fieldName: string;
  fieldValue: string;
  theme: "light" | "regular";
  label: string;
  type?: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: string) => void;
  disabled?: boolean;
  InputProps?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>;
}
