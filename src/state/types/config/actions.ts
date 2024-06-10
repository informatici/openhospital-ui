import { Dispatch } from "redux";
import { IAction } from "../../types";
import { RESET_TYPE_MODE, SET_TYPE_MODE } from "./consts";
import { TypeMode } from "./types";

export const setTypeMode =
  (mode: TypeMode) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: SET_TYPE_MODE,
      payload: mode,
    });
  };

export const resetTypeMode =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: RESET_TYPE_MODE,
    });
  };
