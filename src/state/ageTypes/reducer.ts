import produce from "immer";
import { IAction } from "../types";
import {
  GET_AGETYPES_FAIL,
  GET_AGETYPES_LOADING,
  GET_AGETYPES_SUCCESS,
  GET_AGETYPES_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IAgeTypeState } from "./types";

export default produce((draft: IAgeTypeState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_AGETYPES
     */
    case GET_AGETYPES_LOADING: {
      draft.getAllAgeTypes.status = "LOADING";
      break;
    }

    case GET_AGETYPES_SUCCESS: {
      draft.getAllAgeTypes.status = "SUCCESS";
      draft.getAllAgeTypes.data = action.payload;
      delete draft.getAllAgeTypes.error;
      break;
    }

    case GET_AGETYPES_SUCCESS_EMPTY: {
      draft.getAllAgeTypes.status = "SUCCESS_EMPTY";
      draft.getAllAgeTypes.data = [];
      delete draft.getAllAgeTypes.error;
      break;
    }
    case GET_AGETYPES_FAIL: {
      draft.getAllAgeTypes.status = "FAIL";
      draft.getAllAgeTypes.error = action.error;
      break;
    }
  }
}, initial);
