import produce from "immer";
import { ILayoutsState } from "./types";
import { IAction } from "../types";
import {
  SAVE_LAYOUTS_FAIL,
  SAVE_LAYOUTS_LOADING,
  SAVE_LAYOUTS_RESET,
  SAVE_LAYOUTS_SUCCESS,
  GET_LAYOUTS_FAIL,
  GET_LAYOUTS_LOADING,
  GET_LAYOUTS_RESET,
  GET_LAYOUTS_SUCCESS,
  GET_LAYOUTS_SUCCESS_EMPTY,
  RESET_LAYOUTS_BREAKPOINT,
  RESET_LAYOUTS_FAIL,
  RESET_LAYOUTS_LOADING,
  RESET_LAYOUTS_RESET,
  RESET_LAYOUTS_SUCCESS,
  SET_LAYOUTS_BREAKPOINT,
} from "./consts";
import { initial } from "./initial";
import {
  randomLayout,
  toolboxDashboards,
} from "../../components/accessories/dashboard/layouts/consts";

export default produce((draft: ILayoutsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * Save Layouts Config
     */
    case SAVE_LAYOUTS_LOADING: {
      draft.saveLayouts.status = "LOADING";
      break;
    }

    case SAVE_LAYOUTS_SUCCESS: {
      draft.saveLayouts.status = "SUCCESS";
      draft.layouts = action.payload.layout;
      draft.toolbox = action.payload.toolbox;
      draft.getLayouts.data = action.payload.data;
      delete draft.saveLayouts.error;
      break;
    }

    case SAVE_LAYOUTS_FAIL: {
      draft.saveLayouts.status = "FAIL";
      draft.saveLayouts.error = action.error;
      break;
    }

    case SAVE_LAYOUTS_RESET: {
      draft.saveLayouts.status = "IDLE";
      delete draft.saveLayouts.error;
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
      draft.getLayouts.data = action.payload.data;
      draft.layouts = action.payload.layout;
      draft.toolbox = action.payload.toolbox;
      delete draft.getLayouts.error;
      break;
    }

    case GET_LAYOUTS_SUCCESS_EMPTY: {
      draft.getLayouts.status = "SUCCESS_EMPTY";
      draft.getLayouts.data = undefined;

      draft.layouts = randomLayout(4);
      draft.toolbox = toolboxDashboards(draft.layouts, {});

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
      draft.layouts = randomLayout(4);
      draft.toolbox = toolboxDashboards(draft.layouts, {});
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

    /**
     * Breakpoint
     */
    case RESET_LAYOUTS_BREAKPOINT: {
      draft.breakpoint = "md";
      break;
    }

    case SET_LAYOUTS_BREAKPOINT: {
      draft.breakpoint = action.payload;
      break;
    }
  }
}, initial);
