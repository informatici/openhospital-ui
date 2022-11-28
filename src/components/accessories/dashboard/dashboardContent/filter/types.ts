import { DateRange } from "@material-ui/pickers/DateRangePicker/RangeTypes";

export interface IOwnProps {
  onDateChange: (value: DateRange<Date>) => void;
}
