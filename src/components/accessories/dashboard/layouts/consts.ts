import { Layout, Layouts } from "react-grid-layout";
import { LayoutBreakpoints, TDashboardComponent } from "./types";

export const DASHBOARDS = [
  "opdByAgeType",
  "opdBySex",
  "admissionBySex",
  "admissionByAgeType",
  "admissionByWard",
  "admissionByType",
  "dischargeBySex",
  "dischargeByAgeType",
  "dischargeByWard",
  "dischargeByType",
];

export const defaultLayoutConfig: Layouts = {
  lg: generateLayout("lg"),
  md: generateLayout("md"),
  sm: generateLayout("sm"),
  xs: generateLayout("xs"),
  xxs: generateLayout("xxs"),
};

export const defaultGridLayoutCols: { [key: string]: number } = {
  lg: 12,
  md: 12,
  sm: 12,
  xs: 12,
  xxs: 12,
};

export const defaultGridLayoutBreakpoints = {
  lg: 1280,
  md: 992,
  sm: 760,
  xs: 480,
  xxs: 0,
};

export function getDashboardLabel(dashboardKey: TDashboardComponent): string {
  switch (dashboardKey) {
    case "opdBySex":
      return "dashboard.opdbysex";

    case "opdByAgeType":
      return "dashboard.opdbyagetype";

    case "admissionBySex":
      return "dashboard.admissionbysex";

    case "admissionByType":
      return "dashboard.admissionbytype";

    case "admissionByWard":
      return "dashboard.admissionbyward";

    case "admissionByAgeType":
      return "dashboard.admissionbyagetype";

    case "dischargeBySex":
      return "dashboard.dischargebysex";

    case "dischargeByType":
      return "dashboard.dischargebytype";

    case "dischargeByWard":
      return "dashboard.dischargebyward";

    case "dischargeByAgeType":
      return "dashboard.dischargebyagetype";

    default:
      return "";
  }
}

/**
 * Generates default Layout config if the user don't has one.
 * @param breakpoint Breakpoint
 * @returns A layout config
 */
export function generateLayout(breakpoint: LayoutBreakpoints): Layout[] {
  return DASHBOARDS.map((dashboardKey, index) => {
    let dashboardLayout: Layout;

    switch (breakpoint) {
      case "md": {
        dashboardLayout = {
          i: dashboardKey,
          w: 6,
          h: 3,
          x: index % 2 == 0 ? 0 : 6,
          y: index % 2 == 0 ? 0 : 2,
          minW: 4,
          minH: 3,
          //maxW: 12,
          maxH: 4,
        };

        break;
      }

      case "sm": {
        dashboardLayout = {
          i: dashboardKey,
          w: 6,
          h: 3,
          x: index % 2 == 0 ? 0 : 6,
          y: index % 2 == 0 ? 0 : 2,
          minW: 6,
          minH: 3,
          //maxW: 12,
          maxH: 4,
        };

        break;
      }

      case "xs": {
        dashboardLayout = {
          i: dashboardKey,
          w: 6,
          h: 3,
          x: index % 2 == 0 ? 0 : 6,
          y: index % 2 == 0 ? 0 : 2,
          minW: 6,
          minH: 3,
          //maxW: 2,
          maxH: 4,
        };

        break;
      }

      case "lg":
      default: {
        dashboardLayout = {
          i: dashboardKey,
          w: 4,
          h: 3,
          x: index % 3 == 0 ? 8 : index % 2 == 0 ? 0 : 4,
          y: index % 2 == 0 ? 0 : 2,
          minW: 3,
          minH: 3,
          //maxW: 12,
          maxH: 5,
        };

        break;
      }
    }

    return dashboardLayout;
  });
}
