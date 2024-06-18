import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DiseaseTypeDTO, PregnantTreatmentTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_PREGNANT_TREATMENT_TYPES_FAIL,
  CREATE_PREGNANT_TREATMENT_TYPES_LOADING,
  CREATE_PREGNANT_TREATMENT_TYPES_RESET,
  CREATE_PREGNANT_TREATMENT_TYPES_SUCCESS,
  DELETE_PREGNANT_TREATMENT_TYPES_FAIL,
  DELETE_PREGNANT_TREATMENT_TYPES_LOADING,
  DELETE_PREGNANT_TREATMENT_TYPES_RESET,
  DELETE_PREGNANT_TREATMENT_TYPES_SUCCESS,
  GET_PREGNANT_TREATMENT_TYPES_FAIL,
  GET_PREGNANT_TREATMENT_TYPES_LOADING,
  GET_PREGNANT_TREATMENT_TYPES_SUCCESS,
  GET_PREGNANT_TREATMENT_TYPES_SUCCESS_EMPTY,
  UPDATE_PREGNANT_TREATMENT_TYPES_FAIL,
  UPDATE_PREGNANT_TREATMENT_TYPES_LOADING,
  UPDATE_PREGNANT_TREATMENT_TYPES_RESET,
  UPDATE_PREGNANT_TREATMENT_TYPES_SUCCESS,
} from "./consts";

const pregnantTreatmentTypesApi = new PregnantTreatmentTypesApi(
  customConfiguration()
);

export const getPregnantTreatmentTypes =
  () =>
  (dispatch: Dispatch<IAction<DiseaseTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_PREGNANT_TREATMENT_TYPES_LOADING,
    });
    pregnantTreatmentTypesApi.getPregnantTreatmentTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_PREGNANT_TREATMENT_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_PREGNANT_TREATMENT_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_PREGNANT_TREATMENT_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createPregnantTreatmentType =
  (newPregnantTreatmentType: DiseaseTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_PREGNANT_TREATMENT_TYPES_LOADING,
    });
    pregnantTreatmentTypesApi
      .newPregnantTreatmentType({
        pregnantTreatmentTypeDTO: newPregnantTreatmentType,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_PREGNANT_TREATMENT_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_PREGNANT_TREATMENT_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createPregnantTreatmentTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_PREGNANT_TREATMENT_TYPES_RESET,
    });
  };

export const updatePregnantTreatmentType =
  (updatePregnantTreatmentType: DiseaseTypeDTO, code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_PREGNANT_TREATMENT_TYPES_LOADING,
    });
    pregnantTreatmentTypesApi
      .updatePregnantTreatmentTypes({
        pregnantTreatmentTypeDTO: updatePregnantTreatmentType,
        code,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_PREGNANT_TREATMENT_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_PREGNANT_TREATMENT_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updatePregnantTreatmentTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_PREGNANT_TREATMENT_TYPES_RESET,
    });
  };

export const deletePregnantTreatmentType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_PREGNANT_TREATMENT_TYPES_LOADING,
    });
    pregnantTreatmentTypesApi.deletePregnantTreatmentType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_PREGNANT_TREATMENT_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_PREGNANT_TREATMENT_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deletePregnantTreatmentTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_PREGNANT_TREATMENT_TYPES_RESET,
    });
  };
