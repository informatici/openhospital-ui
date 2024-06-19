import produce from "immer";
import { AgeTypeDTO } from "../../../generated";
import { IAction } from "../../types";
import {
  GET_AGE_TYPES_FAIL,
  GET_AGE_TYPES_LOADING,
  GET_AGE_TYPES_SUCCESS,
  GET_AGE_TYPES_SUCCESS_EMPTY,
  UPDATE_AGE_TYPES_FAIL,
  UPDATE_AGE_TYPES_LOADING,
  UPDATE_AGE_TYPES_RESET,
  UPDATE_AGE_TYPES_SUCCESS,
} from "./consts";

import { initial } from "./initial";
import { IAgeTypesState } from "./types";

export default produce((draft: IAgeTypesState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     *  Get age types
     */
    case GET_AGE_TYPES_LOADING: {
      draft.getAll.status = "LOADING";
      break;
    }

    case GET_AGE_TYPES_SUCCESS: {
      draft.getAll.status = "SUCCESS";
      draft.getAll.data = action.payload;
      delete draft.getAll.error;
      break;
    }

    case GET_AGE_TYPES_FAIL: {
      draft.getAll.status = "FAIL";
      draft.getAll.error = action.error;
      break;
    }

    case GET_AGE_TYPES_SUCCESS_EMPTY: {
      draft.getAll.status = "SUCCESS_EMPTY";
      draft.getAll.data = [];
      delete draft.getAll.error;
      break;
    }

    /**
     * Update age type
     */
    case UPDATE_AGE_TYPES_LOADING: {
      draft.update.status = "LOADING";
      delete draft.update.error;
      break;
    }

    case UPDATE_AGE_TYPES_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      draft.getAll.data = draft.getAll.data?.map((e) => {
        return e.code === action.payload.code
          ? (action.payload as AgeTypeDTO)
          : e;
      });
      delete draft.update.error;
      break;
    }

    case UPDATE_AGE_TYPES_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      break;
    }

    case UPDATE_AGE_TYPES_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      break;
    }
  }
}, initial);
