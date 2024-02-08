export type TViewType = "day" | "week" | "month" | "year" | "range";
export type TPeriodType = "current" | "previous" | "last2" | "last3" | "custom";
export interface IOwnProps {
  onPeriodChange: (value: string[]) => void;
}
