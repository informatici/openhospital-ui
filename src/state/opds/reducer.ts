import produce from "immer";
import { IAction } from "../types";
import { GET_OPD_FAIL, GET_OPD_LOADING, GET_OPD_SUCCESS } from "./consts";
import { initial } from "./initial";
import { IOpdState } from "./types";

export default produce((draft: IOpdState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_OPD
     */
    case GET_OPD_LOADING: {
      draft.getOpds.status = "LOADING";
      break;
    }

    case GET_OPD_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getOpds.status = "SUCCESS";
      } else {
        draft.getOpds.status = "SUCCESS_EMPTY";
      }
      draft.getOpds.data = action.payload;
      delete draft.getOpds.error;
      break;
    }

    case GET_OPD_FAIL: {
      draft.getOpds.status = "FAIL";
      draft.getOpds.error = action.error;
      break;
    }
  }
}, initial);
