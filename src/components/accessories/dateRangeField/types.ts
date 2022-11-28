import { DatePickerView, DateRange, RangeInput } from "@material-ui/pickers";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
import { ComponentType, ReactNode } from "react";
import { FIELD_VALIDATION } from "../../../types";

export interface IProps {
  fieldName?: string;
  fieldValue: DateRange<Date>;
  disableFuture?: boolean;
  disabled?: boolean;
  theme?: "light" | "regular";
  isValid: boolean;
  startErrorText?: string;
  endErrorText?: string;
  startLabel?: string;
  endLabel?: string;
  format: string;
  onChange: (value: DateRange<Date>) => void;
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
  onAccept?: (value: any) => void;
}
