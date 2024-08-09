import { getCachedPeriod } from "../../components/accessories/dashboard/dashboardContent/filter/consts";
import { IDashboardState } from "./types";

export const initial: IDashboardState = {
  period: getCachedPeriod(),
  resetPeriod: false,
};
