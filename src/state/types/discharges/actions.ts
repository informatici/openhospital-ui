import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DischargeTypeApi, DischargeTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_DISCHARGE_TYPES_FAIL,
  CREATE_DISCHARGE_TYPES_LOADING,
  CREATE_DISCHARGE_TYPES_RESET,
  CREATE_DISCHARGE_TYPES_SUCCESS,
  DELETE_DISCHARGE_TYPES_FAIL,
  DELETE_DISCHARGE_TYPES_LOADING,
  DELETE_DISCHARGE_TYPES_RESET,
  DELETE_DISCHARGE_TYPES_SUCCESS,
  GET_DISCHARGE_TYPES_FAIL,
  GET_DISCHARGE_TYPES_LOADING,
  GET_DISCHARGE_TYPES_SUCCESS,
  GET_DISCHARGE_TYPES_SUCCESS_EMPTY,
  UPDATE_DISCHARGE_TYPES_FAIL,
  UPDATE_DISCHARGE_TYPES_LOADING,
  UPDATE_DISCHARGE_TYPES_RESET,
  UPDATE_DISCHARGE_TYPES_SUCCESS,
} from "./consts";

const dischargeTypesApi = new DischargeTypeApi(customConfiguration());

export const getDischargeTypes =
  () =>
  (dispatch: Dispatch<IAction<DischargeTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DISCHARGE_TYPES_LOADING,
    });
    dischargeTypesApi.getDischargeTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISCHARGE_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISCHARGE_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISCHARGE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createDischargeType =
  (newDischargeType: DischargeTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISCHARGE_TYPES_LOADING,
    });
    dischargeTypesApi
      .newDischargeType({ dischargeTypeDTO: newDischargeType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_DISCHARGE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_DISCHARGE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createDischargeTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISCHARGE_TYPES_RESET,
    });
  };

export const updateDischargeType =
  (updateDischargeType: DischargeTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DISCHARGE_TYPES_LOADING,
    });
    dischargeTypesApi
      .updateDischargeTypet({ dischargeTypeDTO: updateDischargeType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_DISCHARGE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_DISCHARGE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateDischargeTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DISCHARGE_TYPES_RESET,
    });
  };

export const deleteDischargeType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DISCHARGE_TYPES_LOADING,
    });
    dischargeTypesApi.deleteDischargeType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_DISCHARGE_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_DISCHARGE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteDischargeTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DISCHARGE_TYPES_RESET,
    });
  };
