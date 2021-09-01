export interface IProps {
  fieldName: string;
  fieldValue: string;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: any) => void;
  isLoading?: boolean;
  disabled?: boolean;
  options: Array<{ value: string | number; label: string }>;
}
