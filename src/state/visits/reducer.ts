import produce from "immer";
import { IAction } from "../types";
import { GET_VISIT_FAIL, GET_VISIT_LOADING, GET_VISIT_SUCCESS } from "./consts";
import { initial } from "./initial";
import { IVisitState } from "./types";

export default produce((draft: IVisitState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_OPD
     */
    case GET_VISIT_LOADING: {
      draft.getVisits.status = "LOADING";
      break;
    }

    case GET_VISIT_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getVisits.status = "SUCCESS";
      } else {
        draft.getVisits.status = "SUCCESS_EMPTY";
      }
      draft.getVisits.data = action.payload;
      delete draft.getVisits.error;
      break;
    }

    case GET_VISIT_FAIL: {
      draft.getVisits.status = "FAIL";
      draft.getVisits.error = action.error;
      break;
    }
  }
}, initial);
