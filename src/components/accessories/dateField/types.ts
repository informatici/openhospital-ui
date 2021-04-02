export interface IProps {
  fieldName: string;
  fieldValue: string;
  disableFuture?: boolean;
  disabled?: boolean;
  theme: "light" | "regular";
  isValid: boolean;
  errorText: string;
  label: string;
  format: string;
  onChange: (value: Date | null) => void;
}
