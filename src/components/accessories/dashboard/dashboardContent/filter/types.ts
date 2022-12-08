import { DateRange } from "@material-ui/pickers/DateRangePicker/RangeTypes";

export type TViewType = "day" | "week" | "month" | "year";
export type TPeriodType = "current" | "previous" | "last2" | "last3" | "custom";
export interface IOwnProps {
  onPeriodChange: (value: string[]) => void;
}
