export interface IProps {
  fieldName: string;
  fieldValue: { value: string; label: string };
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: string) => void;
  options: Array<{ value: string; label: string }>;
}
