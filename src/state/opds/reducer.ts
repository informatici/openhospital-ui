import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_OPD_FAIL,
  CREATE_OPD_LOADING,
  CREATE_OPD_RESET,
  CREATE_OPD_SUCCESS,
  DELETE_OPD_FAIL,
  DELETE_OPD_LOADING,
  DELETE_OPD_RESET,
  DELETE_OPD_SUCCESS,
  GET_OPD_FAIL,
  GET_OPD_LOADING,
  GET_OPD_SUCCESS,
  GET_OPD_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IOpdState } from "./types";

export default produce((draft: IOpdState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_OPD
     */
    case CREATE_OPD_LOADING: {
      draft.createOpd.status = "LOADING";
      break;
    }

    case CREATE_OPD_SUCCESS: {
      draft.createOpd.status = "SUCCESS";
      delete draft.createOpd.error;
      break;
    }

    case CREATE_OPD_FAIL: {
      draft.createOpd.status = "FAIL";
      draft.createOpd.error = action.error;
      break;
    }

    case CREATE_OPD_RESET: {
      draft.createOpd.status = "IDLE";
      delete draft.createOpd.error;
      break;
    }
    case GET_OPD_LOADING: {
      draft.getOpds.status = "LOADING";
      break;
    }

    case GET_OPD_SUCCESS: {
      draft.getOpds.status = "SUCCESS";
      draft.getOpds.data = action.payload;
      delete draft.getOpds.error;
      break;
    }

    case GET_OPD_FAIL: {
      draft.getOpds.status = "FAIL";
      draft.getOpds.error = action.error;
      break;
    }

    case GET_OPD_SUCCESS_EMPTY: {
      draft.getOpds.status = "SUCCESS_EMPTY";
      draft.getOpds.data = [];
      delete draft.getOpds.error;
      break;
    }

    case DELETE_OPD_SUCCESS: {
      draft.deleteOpd.status = "SUCCESS";
      delete draft.deleteOpd.error;
      break;
    }

    case DELETE_OPD_FAIL: {
      draft.deleteOpd.status = "FAIL";
      draft.deleteOpd.error = action.error;
      break;
    }

    case DELETE_OPD_LOADING: {
      draft.deleteOpd.status = "LOADING";
      delete draft.deleteOpd.error;
      break;
    }

    case DELETE_OPD_RESET: {
      draft.deleteOpd.status = "IDLE";
      delete draft.deleteOpd.error;
      break;
    }
  }
}, initial);
