import { Layout, Layouts } from "react-grid-layout";

export type TGridLayoutItemProps = {
  dashboardKey: TDashboardComponent;
  onRemove: () => void;
  className?: string;
  otherProps?: { [key: string]: any };
};

export type TGridLayoutToolboxItemProps = {
  item: Layout;
  onTake: () => void;
};

export type TDashboardComponentProps = {
  onRemove: () => void;
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
