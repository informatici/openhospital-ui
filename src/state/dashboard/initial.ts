import moment from "moment";
import { IDashboardState } from "./types";

export const initial: IDashboardState = {
  period: [
    moment().startOf("day").toISOString(),
    moment().endOf("day").toISOString(),
  ],
  resetPeriod: false,
};
