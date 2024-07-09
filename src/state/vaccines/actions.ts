import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { VaccineDTO, VaccinesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_VACCINES_FAIL,
  GET_VACCINES_LOADING,
  GET_VACCINES_SUCCESS,
  CREATE_VACCINE_FAIL,
  CREATE_VACCINE_LOADING,
  CREATE_VACCINE_RESET,
  CREATE_VACCINE_SUCCESS,
  DELETE_VACCINE_FAIL,
  DELETE_VACCINE_LOADING,
  DELETE_VACCINE_RESET,
  DELETE_VACCINE_SUCCESS,
  UPDATE_VACCINE_FAIL,
  UPDATE_VACCINE_LOADING,
  UPDATE_VACCINE_RESET,
  UPDATE_VACCINE_SUCCESS,
} from "./consts";

const vaccinesApi = new VaccinesApi(customConfiguration());

export const getVaccines =
  () =>
  (dispatch: Dispatch<IAction<VaccineDTO[], {}>>): void => {
    dispatch({
      type: GET_VACCINES_LOADING,
    });
    vaccinesApi.getVaccines().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_VACCINES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_VACCINES_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_VACCINES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createVaccine =
  (newVaccine: VaccineDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VACCINE_LOADING,
    });
    vaccinesApi.newVaccine({ vaccineDTO: newVaccine }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_VACCINE_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_VACCINE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createVaccineReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_VACCINE_RESET,
    });
  };

export const updateVaccine =
  (updateVaccine: VaccineDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VACCINE_LOADING,
    });
    vaccinesApi.updateVaccine({ vaccineDTO: updateVaccine }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_VACCINE_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_VACCINE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateVaccineReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_VACCINE_RESET,
    });
  };

export const deleteVaccine =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VACCINE_LOADING,
    });
    vaccinesApi.deleteVaccine({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_VACCINE_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_VACCINE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteVaccineReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_VACCINE_RESET,
    });
  };
