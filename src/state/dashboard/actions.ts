import { Dispatch } from "redux";
import { IAction } from "../types";
import { RESET_DASHBOARD_PERIOD, SET_DASHBOARD_PERIOD } from "./consts";

export const setDashboardPeriod =
  (period: string[]) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SET_DASHBOARD_PERIOD,
      payload: period,
    });
  };

export const resetDashboardPeriod =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_DASHBOARD_PERIOD,
    });
  };
