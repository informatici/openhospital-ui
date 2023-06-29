import produce from "immer";
import { OpdDTO, OpdWithOperatioRowDTO } from "../../generated";
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
  GET_LAST_OPD_FAIL,
  GET_LAST_OPD_LOADING,
  GET_LAST_OPD_RESET,
  GET_LAST_OPD_SUCCESS,
  GET_OPD_FAIL,
  GET_OPD_LOADING,
  GET_OPD_RESET,
  GET_OPD_SUCCESS,
  GET_OPD_SUCCESS_EMPTY,
  SEARCH_OPD_FAIL,
  SEARCH_OPD_RESET,
  SEARCH_OPD_SUCCESS,
  SEARCH_OPD_SUCCESS_EMPTY,
  UPDATE_OPD_FAIL,
  UPDATE_OPD_LOADING,
  UPDATE_OPD_RESET,
  UPDATE_OPD_SUCCESS,
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
      draft.createOpd.data = action.payload;
      draft.getOpds.data = [...(draft.getOpds.data ?? []), action.payload];
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

    case GET_OPD_RESET: {
      draft.getOpds.status = "IDLE";
      delete draft.getOpds.error;
      break;
    }

    case GET_LAST_OPD_LOADING: {
      draft.lastOpd.status = "LOADING";
      break;
    }

    case GET_LAST_OPD_SUCCESS: {
      draft.lastOpd.status = "SUCCESS";
      draft.lastOpd.data = action.payload;
      delete draft.lastOpd.error;
      break;
    }

    case GET_LAST_OPD_FAIL: {
      draft.lastOpd.status = "FAIL";
      draft.lastOpd.error = action.error;
      draft.lastOpd.data = undefined;
      break;
    }

    case GET_LAST_OPD_RESET: {
      draft.lastOpd.status = "IDLE";
      delete draft.lastOpd.error;
      break;
    }

    case GET_OPD_LOADING: {
      draft.getOpds.status = "LOADING";
      break;
    }

    case SEARCH_OPD_SUCCESS: {
      draft.searchOpds.status = "SUCCESS";
      draft.searchOpds.data = action.payload;
      delete draft.searchOpds.error;
      break;
    }

    case SEARCH_OPD_FAIL: {
      draft.searchOpds.status = "FAIL";
      draft.searchOpds.error = action.error;
      break;
    }

    case SEARCH_OPD_RESET: {
      draft.searchOpds.status = "IDLE";
      draft.getOpds.data = undefined;
      delete draft.getOpds.error;
      break;
    }

    case UPDATE_OPD_LOADING: {
      draft.updateOpd.status = "LOADING";
      delete draft.updateOpd.error;
      break;
    }

    case UPDATE_OPD_SUCCESS: {
      draft.updateOpd.status = "SUCCESS";
      draft.updateOpd.data = action.payload;
      draft.getOpds.data = draft.getOpds.data?.map((e) => {
        return e.opdDTO.code === action.payload.opdDTO.code
          ? (action.payload as OpdWithOperatioRowDTO)
          : e;
      });
      delete draft.updateOpd.error;
      break;
    }

    case UPDATE_OPD_FAIL: {
      draft.updateOpd.status = "FAIL";
      draft.updateOpd.error = action.error;
      break;
    }
    case UPDATE_OPD_RESET: {
      draft.updateOpd.status = "IDLE";
      delete draft.updateOpd.error;
      break;
    }
    case DELETE_OPD_SUCCESS: {
      draft.deleteOpd.status = "SUCCESS";
      draft.getOpds.data = draft.getOpds.data?.filter(
        (e) => e.opdDTO.code !== action.payload.opdDTO.code
      );
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
