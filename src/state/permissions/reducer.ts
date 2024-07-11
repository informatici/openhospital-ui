import produce from "immer";
import { IAction } from "../types";
import {
  GET_PERMISSION_FAIL,
  GET_PERMISSION_LOADING,
  GET_PERMISSION_SUCCESS,
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
    }
  },
  initial
);
