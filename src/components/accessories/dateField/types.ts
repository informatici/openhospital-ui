import { DatePickerView } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
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
  onBlur?: (event: any) => void;
  onError?: (value: string | undefined) => void;
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
  shouldDisableDate?: (date: MaterialUiPickersDate) => boolean;
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
  views?: DatePickerView[];
  required?: FIELD_VALIDATION;
}
