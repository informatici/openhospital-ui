import produce from "immer";
import { IDashboardState } from "./types";
import { IAction } from "../types";
import { RESET_DASHBOARD_PERIOD, SET_DASHBOARD_PERIOD } from "./consts";
import { initial } from "./initial";

export default produce((draft: IDashboardState, action: IAction<any, any>) => {
  switch (action.type) {
    case RESET_DASHBOARD_PERIOD: {
      draft.period = ["", ""];
      break;
    }

    case SET_DASHBOARD_PERIOD: {
      draft.period = action.payload;
      break;
    }
  }
}, initial);
