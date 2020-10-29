import { FieldInputProps } from "formik";

export interface IProps {
  fieldName: string;
  fieldValue: string;
  disableFuture?: boolean;
  disabled?: boolean;
  theme: "light" | "regular";
  label: string;
  format: string;
  onChange: (value: Date | null) => void;
}
