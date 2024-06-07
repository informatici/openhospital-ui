import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { VaccineTypeApi, VaccineTypeDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_VACCINE_TYPES_FAIL,
  CREATE_VACCINE_TYPES_LOADING,
  CREATE_VACCINE_TYPES_RESET,
  CREATE_VACCINE_TYPES_SUCCESS,
  DELETE_VACCINE_TYPES_FAIL,
  DELETE_VACCINE_TYPES_LOADING,
  DELETE_VACCINE_TYPES_RESET,
  DELETE_VACCINE_TYPES_SUCCESS,
  GET_VACCINE_TYPES_FAIL,
  GET_VACCINE_TYPES_LOADING,
  GET_VACCINE_TYPES_SUCCESS,
  GET_VACCINE_TYPES_SUCCESS_EMPTY,
  UPDATE_VACCINE_TYPES_FAIL,
  UPDATE_VACCINE_TYPES_LOADING,
  UPDATE_VACCINE_TYPES_RESET,
  UPDATE_VACCINE_TYPES_SUCCESS,
} from "./consts";

const vaccineTypesApi = new VaccineTypeApi(customConfiguration());

export const getVaccineTypes =
  () =>
  (dispatch: Dispatch<IAction<VaccineTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_VACCINE_TYPES_LOADING,
    });
    vaccineTypesApi.getVaccineType({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_VACCINE_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_VACCINE_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_VACCINE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createVaccineType =
  (newVaccineType: VaccineTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VACCINE_TYPES_LOADING,
    });
    vaccineTypesApi
      .newVaccineType({ vaccineTypeDTO: newVaccineType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_VACCINE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_VACCINE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createVaccineTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VACCINE_TYPES_RESET,
    });
  };

export const updateVaccineType =
  (updateVaccineType: VaccineTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VACCINE_TYPES_LOADING,
    });
    vaccineTypesApi
      .updateVaccineType({ vaccineTypeDTO: updateVaccineType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_VACCINE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_VACCINE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateVaccineTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VACCINE_TYPES_RESET,
    });
  };

export const deleteVaccineType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VACCINE_TYPES_LOADING,
    });
    vaccineTypesApi.deleteVaccineType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_VACCINE_TYPES_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_VACCINE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteVaccineTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VACCINE_TYPES_RESET,
    });
  };
