import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { AdmissionTypesApi, AdmissionTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_ADMISSION_TYPES_FAIL,
  CREATE_ADMISSION_TYPES_LOADING,
  CREATE_ADMISSION_TYPES_RESET,
  CREATE_ADMISSION_TYPES_SUCCESS,
  DELETE_ADMISSION_TYPES_FAIL,
  DELETE_ADMISSION_TYPES_LOADING,
  DELETE_ADMISSION_TYPES_RESET,
  DELETE_ADMISSION_TYPES_SUCCESS,
  GET_ADMISSION_TYPES_FAIL,
  GET_ADMISSION_TYPES_LOADING,
  GET_ADMISSION_TYPES_SUCCESS,
  GET_ADMISSION_TYPES_SUCCESS_EMPTY,
  UPDATE_ADMISSION_TYPES_FAIL,
  UPDATE_ADMISSION_TYPES_LOADING,
  UPDATE_ADMISSION_TYPES_RESET,
  UPDATE_ADMISSION_TYPES_SUCCESS,
} from "./consts";

const admissionTypesApi = new AdmissionTypesApi(customConfiguration());

export const getAdmissionTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_ADMISSION_TYPES_LOADING,
    });
    admissionTypesApi.getAdmissionTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_ADMISSION_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_ADMISSION_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_ADMISSION_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createAdmissionType =
  (newAdmissionType: AdmissionTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_ADMISSION_TYPES_LOADING,
    });
    admissionTypesApi
      .newAdmissionType({ admissionTypeDTO: newAdmissionType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_ADMISSION_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_ADMISSION_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createAdmissionTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_ADMISSION_TYPES_RESET,
    });
  };

export const updateAdmissionType =
  (updateAdmissionType: AdmissionTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_ADMISSION_TYPES_LOADING,
    });
    admissionTypesApi
      .updateAdmissionTypes({ admissionTypeDTO: updateAdmissionType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_ADMISSION_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_ADMISSION_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateAdmissionTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_ADMISSION_TYPES_RESET,
    });
  };

export const deleteAdmissionType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_ADMISSION_TYPES_LOADING,
    });
    admissionTypesApi.deleteAdmissionType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_ADMISSION_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_ADMISSION_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteAdmissionTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_ADMISSION_TYPES_RESET,
    });
  };
