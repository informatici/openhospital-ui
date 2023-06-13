import { Layout, Layouts } from "react-grid-layout";
import {
  LayoutBreakpoints,
  LayoutConfiguration,
  TDashboardComponent,
} from "./types";

/**
 * This array contains all dashboard widgets
 * If a dashboard widget is added, its name should be added in this array
 * and a `switch case` should be added in the switch control of a component
 * src\components\accessories\dashboard\layouts\item\GridLayoutItem.tsx
 */
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
  xs: 490,
  xxs: 0,
};

/**
 * Get dashboard label's translation key
 * @param dashboardKey Dashboard key
 * @returns Return the translation key
 */
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
 * Remove duplicates in layout config.
 * @param input
 * @returns Return the config without duplicates
 */
export function removeDuplicates(input: Layouts): Layouts {
  let cleanInput: Layouts = { ...input };

  Object.keys(input).forEach((breakpoint) => {
    let breakpointConfig = input[breakpoint].filter(
      (layout, index, self) =>
        self.findIndex((layoutTmp) => layoutTmp.i === layout.i) === index
    );

    cleanInput[breakpoint] = breakpointConfig;
  });

  return cleanInput;
}

/**
 * Remove duplicated widgets in toolbox and layout
 * @param input1 Toolbox
 * @param input2 Layout
 * @returns Toolbox without duplicates
 */
export function removeDoubles(input1: Layouts, input2: Layouts): Layouts {
  let cleanInput: Layouts = {};

  Object.keys(input1).forEach((breakpoint) => {
    let breakpointConfig = input1[breakpoint].filter((layout) => {
      return !input2[breakpoint].some((layout1) => layout1.i == layout.i);
    });

    cleanInput[breakpoint] = breakpointConfig;
  });

  return cleanInput;
}

/**
 * Generate layout for random Dashboards
 * @param nbDashboard Number of dashboard to generate
 * @returns Returns the layout config for specified Dashboards number
 */
export function randomLayout(nbDashboard: number): Layouts {
  let randomDashboards = randomItems(DASHBOARDS, nbDashboard);

  return removeDuplicates({
    lg: generateLayout("lg", randomDashboards),
    md: generateLayout("md", randomDashboards),
    sm: generateLayout("sm", randomDashboards),
    xs: generateLayout("xs", randomDashboards),
    xxs: generateLayout("xxs", randomDashboards),
  });
}

/**
 * Add dashboards that are not in shown dashboard nor toolbox to
 * the toolbox
 * @param shownDashboard Layout with shown dashboard
 * @param currentToolBox Toolbox
 * @returns
 */
export function toolboxDashboards(
  shownDashboard: Layouts,
  currentToolBox: Layouts
): Layouts {
  let toolbox = { ...currentToolBox };

  let knownDashboard: { [key: string]: string[] } = {};
  let unknownDashboard: { [key: string]: string[] } = {};

  ["lg", "md", "sm", "xs", "xxs"].forEach((breakpoint) => {
    knownDashboard[breakpoint] = [
      ...(getLayoutDashboards(shownDashboard)[breakpoint] ?? []),
      ...(getLayoutDashboards(currentToolBox)[breakpoint] ?? []),
    ];
  });

  ["lg", "md", "sm", "xs", "xxs"].forEach((breakpoint) => {
    unknownDashboard[breakpoint] = DASHBOARDS.filter(
      (dashboard) => !knownDashboard[breakpoint].includes(dashboard)
    );
  });

  let unknownDashsCount = 0;
  Object.keys(unknownDashboard).forEach((obj) => {
    unknownDashsCount += unknownDashboard[obj].length;
  });

  if (unknownDashsCount > 0) {
    let unknownDashboardLayout: Layouts = {
      lg: generateLayout(
        "lg",
        unknownDashboard["lg"].length > 0 ? unknownDashboard["lg"] : []
      ),
      md: generateLayout(
        "md",
        unknownDashboard["md"].length > 0 ? unknownDashboard["md"] : []
      ),
      sm: generateLayout(
        "sm",
        unknownDashboard["sm"].length > 0 ? unknownDashboard["sm"] : []
      ),
      xs: generateLayout(
        "xs",
        unknownDashboard["xs"].length > 0 ? unknownDashboard["xs"] : []
      ),
      xxs: generateLayout(
        "xxs",
        unknownDashboard["xxs"].length > 0 ? unknownDashboard["xxs"] : []
      ),
    };

    ["lg", "md", "sm", "xs", "xxs"].forEach((breakpoint) => {
      toolbox[breakpoint] = [
        ...(toolbox[breakpoint] ?? []),
        ...unknownDashboardLayout[breakpoint],
      ];
    });
  }

  return removeDoubles(removeDuplicates(toolbox), shownDashboard);
}

/**
 * Return dashboard in layout
 * @param layout Layout
 */
export function getLayoutDashboards(layout: Layouts): {
  [key: string]: string[];
} {
  let dashboards: { [key: string]: string[] } = {};

  Object.keys(layout).forEach((breakpoint) => {
    layout[breakpoint].forEach((layout) => {
      if (!dashboards[breakpoint]) {
        dashboards[breakpoint] = [layout.i];
      } else if (!dashboards[breakpoint].includes(layout.i)) {
        dashboards[breakpoint].push(layout.i);
      }
    });
  });

  return dashboards;
}

/**
 * Generates default Layout config if the user don't has one.
 * @param breakpoint Breakpoint
 * @param dashboards List of dashboards
 * @returns Returns the layout config
 */
export function generateLayout(
  breakpoint: LayoutBreakpoints,
  dashboards?: string[]
): Layout[] {
  if (!dashboards || dashboards.length == 0) {
    dashboards = DASHBOARDS;
  }

  return dashboards.map((dashboardKey, index) => {
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

      case "xxs": {
        dashboardLayout = {
          i: dashboardKey,
          w: 12,
          h: 3,
          x: 0,
          y: index % 2 == 0 ? 0 : 2,
          minW: 12,
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

/**
 * Pick random items in an Array
 * @param input Input array
 * @param nbItems Number of items to pick
 * @returns Returns a list of random items
 */
export function randomItems<T>(input: T[], nbItems: number): T[] {
  const shuffledArray = input.sort(() => 0.5 - Math.random());

  return shuffledArray.slice(0, nbItems);
}

/**
 * Encode layout config before saving
 * @param config Layout configuration
 * @returns Returns JSON string
 */
export function encodeLayout(config: LayoutConfiguration): string {
  return btoa(JSON.stringify(config));
}

/**
 * Decode layout configuration fetched from backend
 * @param configString JSON string
 * @returns Return Layout Configuration
 */
export function decodeLayoutConfig(
  configString: string
): LayoutConfiguration | null {
  let decodeConfig = JSON.parse(atob(configString));

  if (!decodeConfig.layout || !decodeConfig.toolbox) {
    return null;
  }

  let layoutConfig: LayoutConfiguration = {
    layout: decodeConfig.layout,
    toolbox: decodeConfig.toolbox,
  };

  return layoutConfig;
}
