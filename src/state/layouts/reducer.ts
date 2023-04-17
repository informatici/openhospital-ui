import produce from "immer";
import { ILayoutsState } from "./types";
import { IAction } from "../types";
import {
  CREATE_LAYOUTS_FAIL,
  CREATE_LAYOUTS_LOADING,
  CREATE_LAYOUTS_RESET,
  CREATE_LAYOUTS_SUCCESS,
  GET_LAYOUTS_FAIL,
  GET_LAYOUTS_LOADING,
  GET_LAYOUTS_RESET,
  GET_LAYOUTS_SUCCESS,
  GET_LAYOUTS_SUCCESS_EMPTY,
  RESET_LAYOUTS_FAIL,
  RESET_LAYOUTS_LOADING,
  RESET_LAYOUTS_RESET,
  RESET_LAYOUTS_SUCCESS,
} from "./consts";

export default produce((draft: ILayoutsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * Save Layouts Config
     */
    case CREATE_LAYOUTS_LOADING: {
      draft.createLayouts.status = "LOADING";
      break;
    }

    case CREATE_LAYOUTS_SUCCESS: {
      draft.createLayouts.status = "SUCCESS";
      draft.createLayouts.data = action.payload;
      draft.getLayouts.data = action.payload;
      delete draft.createLayouts.error;
      break;
    }

    case CREATE_LAYOUTS_FAIL: {
      draft.createLayouts.status = "FAIL";
      draft.createLayouts.error = action.error;
      break;
    }

    case CREATE_LAYOUTS_RESET: {
      draft.createLayouts.status = "IDLE";
      delete draft.createLayouts.error;
      break;
    }

    /**
     * Get Layouts Config
     */
    case GET_LAYOUTS_LOADING: {
      draft.getLayouts.status = "LOADING";
      break;
    }

    case GET_LAYOUTS_SUCCESS: {
      draft.getLayouts.status = "SUCCESS";
      draft.getLayouts.data = action.payload;
      delete draft.getLayouts.error;
      break;
    }

    case GET_LAYOUTS_SUCCESS_EMPTY: {
      draft.getLayouts.status = "SUCCESS_EMPTY";
      draft.getLayouts.data = [];
      delete draft.getLayouts.error;
      break;
    }
    case GET_LAYOUTS_FAIL: {
      draft.getLayouts.status = "FAIL";
      draft.getLayouts.error = action.error;
      break;
    }

    case GET_LAYOUTS_RESET: {
      draft.getLayouts.status = "IDLE";
      delete draft.getLayouts.data;
      delete draft.getLayouts.error;
      break;
    }

    /**
     * Reset Layouts Config
     */
    case RESET_LAYOUTS_LOADING: {
      draft.resetLayouts.status = "LOADING";
      break;
    }

    case RESET_LAYOUTS_SUCCESS: {
      draft.resetLayouts.status = "SUCCESS";
      draft.resetLayouts.data = action.payload;
      draft.getLayouts.data = action.payload;
      delete draft.resetLayouts.error;
      break;
    }

    case RESET_LAYOUTS_FAIL: {
      draft.resetLayouts.status = "FAIL";
      draft.resetLayouts.error = action.error;
      break;
    }

    case RESET_LAYOUTS_RESET: {
      draft.resetLayouts.status = "IDLE";
      delete draft.resetLayouts.error;
      break;
    }
  }
});
