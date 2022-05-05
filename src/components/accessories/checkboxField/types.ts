export interface IProps {
  fieldName: string;
  checked: boolean;
  disabled?: boolean;
  theme?: "light" | "regular";
  label: string;
  onChange: (value: boolean) => void;
}
