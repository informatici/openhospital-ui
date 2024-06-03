import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_WARD_FAIL,
  CREATE_WARD_LOADING,
  CREATE_WARD_RESET,
  CREATE_WARD_SUCCESS,
  DELETE_WARD_FAIL,
  DELETE_WARD_LOADING,
  DELETE_WARD_RESET,
  DELETE_WARD_SUCCESS,
  GET_WARD_FAIL,
  GET_WARD_LOADING,
  GET_WARD_SUCCESS,
  UPDATE_WARD_FAIL,
  UPDATE_WARD_LOADING,
  UPDATE_WARD_RESET,
  UPDATE_WARD_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IWardState } from "./types";

export default produce((draft: IWardState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_WARD_LOADING: {
      draft.allWards.status = "LOADING";
      break;
    }

    case GET_WARD_SUCCESS: {
      draft.allWards.status = "SUCCESS";
      draft.allWards.data = action.payload;
      delete draft.allWards.error;
      break;
    }

    case GET_WARD_FAIL: {
      draft.allWards.status = "FAIL";
      draft.allWards.error = action.error;
      break;
    }

    case CREATE_WARD_LOADING: {
      draft.create.status = "LOADING";
      break;
    }

    case CREATE_WARD_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      delete draft.create.error;
      break;
    }

    case CREATE_WARD_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      break;
    }

    case CREATE_WARD_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      delete draft.create.data;
      break;
    }

    case UPDATE_WARD_LOADING: {
      draft.update.status = "LOADING";
      break;
    }

    case UPDATE_WARD_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      delete draft.update.error;
      break;
    }

    case UPDATE_WARD_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      break;
    }

    case UPDATE_WARD_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      delete draft.update.data;
      break;
    }

    case DELETE_WARD_LOADING: {
      draft.delete.status = "LOADING";
      break;
    }

    case DELETE_WARD_SUCCESS: {
      draft.delete.status = "SUCCESS";
      draft.delete.data = action.payload;
      delete draft.delete.error;
      break;
    }

    case DELETE_WARD_FAIL: {
      draft.delete.status = "FAIL";
      draft.delete.error = action.error;
      break;
    }

    case DELETE_WARD_RESET: {
      draft.delete.status = "IDLE";
      delete draft.delete.error;
      delete draft.delete.data;
      break;
    }
  }
}, initial);
