import { DateRange } from "@material-ui/pickers/DateRangePicker/RangeTypes";

export type TViewType = "day" | "week" | "month" | "year";
export interface IOwnProps {
  onPeriodChange: (value: string[]) => void;
}
