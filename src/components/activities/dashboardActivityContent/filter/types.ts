export type TViewType = "day" | "week" | "month" | "year";
export interface IOwnProps {
  onDateChange: (value: string) => void;
  onViewChange: (value: TViewType) => void;
}
