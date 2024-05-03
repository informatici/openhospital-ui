export interface IProps {
  fieldName: string;
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: (value: boolean) => void;
}
