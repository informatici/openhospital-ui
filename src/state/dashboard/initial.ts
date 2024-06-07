import { IDashboardState } from "./types";
import { ApiResponse } from "../types";
import { getCachedPeriod } from "../../components/accessories/dashboard/dashboardContent/filter/consts";

export const initial: IDashboardState = {
  period: getCachedPeriod(),
  resetPeriod: false,
};
