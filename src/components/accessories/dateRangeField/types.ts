import { DatePickerView, DateRange } from "@material-ui/pickers";
import { MuiTextFieldProps } from "@material-ui/pickers/_shared/PureDateInput";
import { ComponentType } from "react";
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
  onClose: () => void;
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
  allowSameDateSelection?: boolean;
  calendars?: 1 | 2 | 3;
}
