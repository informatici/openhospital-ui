import produce from "immer";
import { ApiResponse, IAction } from "../types";
import {
  GET_PERMISSION_FAIL,
  GET_PERMISSION_LOADING,
  GET_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_FAIL,
  UPDATE_PERMISSION_LOADING,
  UPDATE_PERMISSION_SUCCESS,
  UPDATE_PERMISSION_RESET,
} from "./consts";
import { initial } from "./initial";
import { IPermissionsState } from "./types";

export default produce(
  (draft: IPermissionsState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * GET_PERMISSION
       */
      case GET_PERMISSION_LOADING: {
        draft.getAll.status = "LOADING";
        break;
      }

      case GET_PERMISSION_SUCCESS: {
        draft.getAll.status = "SUCCESS";
        draft.getAll.data = action.payload;
        delete draft.getAll.error;
        break;
      }

      case GET_PERMISSION_FAIL: {
        draft.getAll.status = "FAIL";
        draft.getAll.error = action.error;
        break;
      }

      /**
       * UPDATE_PERMISSION
       */

      case UPDATE_PERMISSION_LOADING: {
        draft.update.status = "LOADING";
        break;
      }

      case UPDATE_PERMISSION_SUCCESS: {
        draft.update.status = "SUCCESS";
        draft.update.data = action.payload;
        delete draft.update.error;
        break;
      }

      case UPDATE_PERMISSION_FAIL: {
        draft.update.status = "FAIL";
        draft.update.error = action.error;
        break;
      }

      case UPDATE_PERMISSION_RESET: {
        draft.update = new ApiResponse({ status: "IDLE" });
        break;
      }
    }
  },
  initial
);
