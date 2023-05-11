import { Layout, Layouts } from "react-grid-layout";

export type TGridLayoutItemProps = {
  dashboardKey: TDashboardComponent;
  onRemove: () => void;
  onFullScreenEnter?: () => void;
  className?: string;
  otherProps?: { [key: string]: any };
};

export type TGridLayoutToolboxItemProps = {
  item: Layout;
  onTake: () => void;
};

export type TDashboardComponentProps = {
  onFullScreenEnter?: () => void;
  onRemove?: () => void;
};

export type TDashboardWidgetProps = TDashboardComponentProps & {
  dashboard: TDashboardComponent;
  period: string[];
};

export type LayoutBreakpoints = "lg" | "md" | "sm" | "xs" | "xxs";

export type LayoutConfiguration = {
  layout: Layouts;
  toolbox: Layouts;
};

export type TDashboardComponent =
  | "opdByAgeType"
  | "opdBySex"
  | "admissionBySex"
  | "admissionByAgeType"
  | "admissionByWard"
  | "admissionByType"
  | "dischargeBySex"
  | "dischargeByAgeType"
  | "dischargeByWard"
  | "dischargeByType";
