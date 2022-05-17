export interface IProps {
  fieldName: string;
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: (value: boolean) => void;
}
