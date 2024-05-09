import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { WardDTO } from "../../generated";
import { WardsApi } from "../../generated/apis/WardsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
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

const wardsApi = new WardsApi(customConfiguration());

export const getWards =
  () =>
  (dispatch: Dispatch<IAction<WardDTO[], {}>>): void => {
    dispatch({
      type: GET_WARD_LOADING,
    });
    wardsApi.getWards().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_WARD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createWard =
  (wardDTO: WardDTO) =>
  (dispatch: Dispatch<IAction<WardDTO, {}>>): void => {
    dispatch({
      type: CREATE_WARD_LOADING,
    });
    wardsApi.newWard({ wardDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_WARD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_WARD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateWard =
  (wardDTO: WardDTO) =>
  (dispatch: Dispatch<IAction<WardDTO, {}>>): void => {
    dispatch({
      type: UPDATE_WARD_LOADING,
    });
    wardsApi.updateWard({ wardDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_WARD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_WARD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteWard =
  (code: string) =>
  (dispatch: Dispatch<IAction<boolean, {}>>): void => {
    dispatch({
      type: DELETE_WARD_LOADING,
    });
    wardsApi.deleteWard({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_WARD_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_WARD_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createWardReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_WARD_RESET,
    });
  };

export const updateWardReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_WARD_RESET,
    });
  };

export const deleteWardReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_WARD_RESET,
    });
  };
