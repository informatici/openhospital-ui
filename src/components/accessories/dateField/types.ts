import { DateView } from "@mui/x-date-pickers";
import { ComponentType } from "react";
import { FIELD_VALIDATION } from "../../../types";
import { TextFieldProps } from "@mui/material";

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
  views?: DateView[];
  required?: FIELD_VALIDATION;
  TextFieldComponent?: ComponentType<TextFieldProps>;
  open?: boolean;
  okLabel?: string;
  cancelLabel?: string;
}
