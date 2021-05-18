import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { TFields } from "../../../../libraries/formDataHandling/types";

interface IBookingProps {
  fields: TFields<TBookingFormFieldName>;
  onSubmit: (booking: any) => void;
  submitButtonLabel: string;
  resetButtonLabel: string;
  isLoading: boolean;
  shouldResetForm: boolean;
  resetFormCallback: () => void;
  onMonthChange?: (date: MaterialUiPickersDate) => void | Promise<void>;
  shouldDisableDate?: (date: MaterialUiPickersDate) => boolean;
  renderDay?: (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element
  ) => JSX.Element;
}

export type TBookingProps = IBookingProps;

export type TBookingFormFieldName = "category" | "service" | "bookingDate";
