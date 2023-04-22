import { Dispatch } from "redux";
import { IAction } from "../types";
import {
  RESET_LAYOUTS_BREAKPOINT,
  RESET_LAYOUTS_TOOLBOX,
  SAVE_LAYOUTS_SUCCESS,
  SET_LAYOUTS_BREAKPOINT,
  SET_LAYOUTS_TOOLBOX,
} from "./consts";
import { Layouts } from "react-grid-layout";

export const saveLayouts =
  (layouts: Layouts) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SAVE_LAYOUTS_SUCCESS,
      payload: layouts,
    });

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

export const setToolbox =
  (toolbox: Layouts) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SET_LAYOUTS_TOOLBOX,
      payload: toolbox,
    });
  };

export const toolboxReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_LAYOUTS_TOOLBOX,
    });
  };

export const breakpointReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_LAYOUTS_BREAKPOINT,
    });
  };
