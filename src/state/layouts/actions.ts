import { Dispatch } from "redux";
import { IAction } from "../types";
import {
  GET_LAYOUTS_LOADING,
  GET_LAYOUTS_SUCCESS,
  RESET_LAYOUTS_BREAKPOINT,
  SAVE_LAYOUTS_FAIL,
  SAVE_LAYOUTS_LOADING,
  SAVE_LAYOUTS_SUCCESS,
  SET_LAYOUTS_BREAKPOINT,
} from "./consts";
import {
  decodeLayoutConfig,
  randomLayout,
  toolboxDashboards,
} from "../../components/accessories/dashboard/layouts/consts";
import { Layouts } from "react-grid-layout";

export const getLayouts =
  (userId: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: GET_LAYOUTS_LOADING,
    });

    /**
     * To be replace with real data after API is available
     */
    let layout: Layouts;
    let toolbox: Layouts;
    let savedConfig = localStorage.getItem("lc");
    if (savedConfig && atob(savedConfig) !== null) {
      savedConfig = atob(savedConfig);
      let decodedConfig = decodeLayoutConfig(savedConfig);
      if (decodedConfig) {
        layout = decodedConfig.layout;
        toolbox = decodedConfig.toolbox;
      } else {
        layout = randomLayout(4);
        toolbox = toolboxDashboards(layout, {});
      }
    } else {
      layout = randomLayout(4);
      toolbox = toolboxDashboards(layout, {});
    }

    dispatch({
      type: GET_LAYOUTS_SUCCESS,
      payload: { layout, toolbox },
    });

    /**@todo Get config with provided API */
  };

export const saveLayouts =
  (layoutConfig: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SAVE_LAYOUTS_LOADING,
    });

    let decodedConfig = decodeLayoutConfig(layoutConfig);
    if (decodedConfig) {
      localStorage.setItem("lc", btoa(layoutConfig));
      dispatch({
        type: SAVE_LAYOUTS_SUCCESS,
        payload: decodedConfig,
      });
    } else {
      dispatch({
        type: SAVE_LAYOUTS_FAIL,
        error: "Fail to load config",
      });
    }

    /**@todo Save config with provided API */
  };

export const setBreakpoint =
  (breakpoint: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SET_LAYOUTS_BREAKPOINT,
      payload: breakpoint,
    });
  };

export const breakpointReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_LAYOUTS_BREAKPOINT,
    });
  };
