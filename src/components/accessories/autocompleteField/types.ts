export interface IProps {
  fieldName: string;
  fieldValue: string | number;
  label: string;
  isValid: boolean;
  errorText: string;
  onBlur: (e: any, value: any) => void;
  loading?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  options: Array<DefaultOptionType | any>;
  theme?: string;
  onInputChange?: (e: any, value: any) => void;
  freeSolo?: boolean;
  getOptionLabel?: <T>(option: T) => string;
  renderOption?: <T>(params: T) => JSX.Element;
  getOptionSelected?: <T>(option: T, value: T) => boolean;
  id?: string;
  onChange?: (e: object, val: any | null) => void;
  optionsComparator?: <T>(option: T, val: string | number) => boolean;
}
export type DefaultOptionType = { value: string | number; label: string };
