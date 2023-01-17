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
  getOptionLabel?: (option: any) => string;
  renderOption?: (params: any) => JSX.Element;
  getOptionSelected?: (option: any, value: any) => boolean;
  id?: string;
  onChange?: (e: object, val: any | null) => void;
  optionsComparator?: (option: any, val: string | number) => boolean;
  autoSelect?: boolean;
  clearOnBlur?: boolean;
  selectOnFocus?: boolean;
  handleHomeEndKeys?: boolean;
  options_limit?: number;
}
export type DefaultOptionType = { value: string | number; label: string };
