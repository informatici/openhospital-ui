export interface IProps {
  fieldName: string;
  fieldValue: string;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: any) => void;
  options: Array<{ value: string; label: string }>;
  isLoading?: boolean;
  disabled?: boolean;
}
