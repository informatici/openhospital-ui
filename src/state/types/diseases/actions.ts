import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DiseaseTypesApi, DiseaseTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_DISEASE_TYPES_FAIL,
  CREATE_DISEASE_TYPES_LOADING,
  CREATE_DISEASE_TYPES_RESET,
  CREATE_DISEASE_TYPES_SUCCESS,
  DELETE_DISEASE_TYPES_FAIL,
  DELETE_DISEASE_TYPES_LOADING,
  DELETE_DISEASE_TYPES_RESET,
  DELETE_DISEASE_TYPES_SUCCESS,
  GET_DISEASE_TYPES_FAIL,
  GET_DISEASE_TYPES_LOADING,
  GET_DISEASE_TYPES_SUCCESS,
  GET_DISEASE_TYPES_SUCCESS_EMPTY,
  UPDATE_DISEASE_TYPES_FAIL,
  UPDATE_DISEASE_TYPES_LOADING,
  UPDATE_DISEASE_TYPES_RESET,
  UPDATE_DISEASE_TYPES_SUCCESS,
} from "./consts";

const diseaseTypesApi = new DiseaseTypesApi(customConfiguration());

export const getDiseaseTypes =
  () =>
  (dispatch: Dispatch<IAction<DiseaseTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DISEASE_TYPES_LOADING,
    });
    diseaseTypesApi.getAllDiseaseTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DISEASE_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISEASE_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISEASE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createDiseaseType =
  (newDiseaseType: DiseaseTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISEASE_TYPES_LOADING,
    });
    diseaseTypesApi
      .newDiseaseType({ diseaseTypeDTO: newDiseaseType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_DISEASE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_DISEASE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createDiseaseTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DISEASE_TYPES_RESET,
    });
  };

export const updateDiseaseType =
  (updateDiseaseType: DiseaseTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DISEASE_TYPES_LOADING,
    });
    diseaseTypesApi
      .updateDiseaseType({ diseaseTypeDTO: updateDiseaseType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_DISEASE_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_DISEASE_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateDiseaseTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DISEASE_TYPES_RESET,
    });
  };

export const deleteDiseaseType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DISEASE_TYPES_LOADING,
    });
    diseaseTypesApi.deleteDiseaseType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_DISEASE_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_DISEASE_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteDiseaseTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DISEASE_TYPES_RESET,
    });
  };
