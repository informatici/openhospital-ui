import { Dispatch } from "redux";
import { IAction } from "../types";
import { RESET_DASHBOARD_PERIOD, SET_DASHBOARD_PERIOD } from "./consts";
import moment from "moment";

export const setDashboardPeriod =
  (period: string[]) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    localStorage.setItem(btoa("dfp"), btoa(JSON.stringify(period)));

    dispatch({
      type: SET_DASHBOARD_PERIOD,
      payload: period,
    });
  };

export const resetDashboardPeriod =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    localStorage.removeItem(btoa("dfp"));

    dispatch({
      type: RESET_DASHBOARD_PERIOD,
      payload: [
        moment().startOf("day").toISOString(),
        moment().endOf("day").toISOString(),
      ],
    });
  };
