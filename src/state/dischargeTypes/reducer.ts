import produce from "immer";
import { IAction } from "../types";
import {
  GET_DISCHARGETYPE_FAIL,
  GET_DISCHARGETYPE_LOADING,
  GET_DISCHARGETYPE_SUCCESS,
  GET_DISCHARGETYPE_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IDischargeTypeState } from "./types";

export default produce(
  (draft: IDischargeTypeState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * GET_DISCHARGETYPE
       */
      case GET_DISCHARGETYPE_LOADING: {
        draft.allDischargeTypes.status = "LOADING";
        break;
      }

      case GET_DISCHARGETYPE_SUCCESS: {
        draft.allDischargeTypes.status = "SUCCESS";
        draft.allDischargeTypes.data = action.payload;
        delete draft.allDischargeTypes.error;
        break;
      }

      case GET_DISCHARGETYPE_SUCCESS_EMPTY: {
        draft.allDischargeTypes.status = "SUCCESS_EMPTY";
        draft.allDischargeTypes.data = [];
        delete draft.allDischargeTypes.error;
        break;
      }
      case GET_DISCHARGETYPE_FAIL: {
        draft.allDischargeTypes.status = "FAIL";
        draft.allDischargeTypes.error = action.error;
        break;
      }
    }
  },
  initial
);
