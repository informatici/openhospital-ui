import { DatePickerView } from "@material-ui/pickers";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
import { ComponentType, ReactNode } from "react";
import { FIELD_VALIDATION } from "../../../types";

export interface IProps {
  fieldName: string;
  fieldValue: string;
  disableFuture?: boolean;
  disabled?: boolean;
  theme?: "light" | "regular";
  isValid: boolean;
  errorText: string;
  label: string;
  format: string;
  onChange: (value: Date | null) => void;
  onMonthChange?: (date: any) => void | Promise<void>;
  shouldDisableDate?: (date: any) => boolean;
  renderDay?: (
    day: any,
    selectedDate: any,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
  views?: DatePickerView[];
  required?: FIELD_VALIDATION;
  TextFieldComponent?: ComponentType<MuiTextFieldProps>;
  open?: boolean;
  okLabel?: string;
  cancelLabel?: string;
}
