import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { MedicalTypesApi, MedicalTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_MEDICAL_TYPES_FAIL,
  CREATE_MEDICAL_TYPES_LOADING,
  CREATE_MEDICAL_TYPES_RESET,
  CREATE_MEDICAL_TYPES_SUCCESS,
  DELETE_MEDICAL_TYPES_FAIL,
  DELETE_MEDICAL_TYPES_LOADING,
  DELETE_MEDICAL_TYPES_RESET,
  DELETE_MEDICAL_TYPES_SUCCESS,
  GET_MEDICAL_TYPES_FAIL,
  GET_MEDICAL_TYPES_LOADING,
  GET_MEDICAL_TYPES_SUCCESS,
  GET_MEDICAL_TYPES_SUCCESS_EMPTY,
  UPDATE_MEDICAL_TYPES_FAIL,
  UPDATE_MEDICAL_TYPES_LOADING,
  UPDATE_MEDICAL_TYPES_RESET,
  UPDATE_MEDICAL_TYPES_SUCCESS,
} from "./consts";

const medicalTypesApi = new MedicalTypesApi(customConfiguration());

export const getMedicalTypes =
  () =>
  (dispatch: Dispatch<IAction<MedicalTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_MEDICAL_TYPES_LOADING,
    });
    medicalTypesApi.getMedicalTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_MEDICAL_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_MEDICAL_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_MEDICAL_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createMedicalType =
  (newMedicalType: MedicalTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_MEDICAL_TYPES_LOADING,
    });
    medicalTypesApi
      .createMedicalType({ medicalTypeDTO: newMedicalType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_MEDICAL_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_MEDICAL_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createMedicalTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_MEDICAL_TYPES_RESET,
    });
  };

export const updateMedicalType =
  (updateMedicalType: MedicalTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_MEDICAL_TYPES_LOADING,
    });
    medicalTypesApi
      .updateMedicalType({ medicalTypeDTO: updateMedicalType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_MEDICAL_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_MEDICAL_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateMedicalTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_MEDICAL_TYPES_RESET,
    });
  };

export const deleteMedicalType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_MEDICAL_TYPES_LOADING,
    });
    medicalTypesApi.deleteMedicalType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_MEDICAL_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_MEDICAL_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteMedicalTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_MEDICAL_TYPES_RESET,
    });
  };
