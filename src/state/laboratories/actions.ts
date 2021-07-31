import { Dispatch } from "redux";
import {
  Configuration,
  LaboratoryControllerApi,
  LaboratoryDTO,
  LabWithRowsDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_LAB_FAIL,
  CREATE_LAB_LOADING,
  CREATE_LAB_RESET,
  CREATE_LAB_SUCCESS,
  DELETE_LAB_FAIL,
  DELETE_LAB_LOADING,
  DELETE_LAB_RESET,
  DELETE_LAB_SUCCESS,
  GET_LAB_FAIL,
  GET_LAB_LOADING,
  GET_LAB_SUCCESS,
  GET_LAB_SUCCESS_EMPTY,
  GET_MATERIALS_FAIL,
  GET_MATERIALS_LOADING,
  GET_MATERIALS_SUCCESS,
  UPDATE_LAB_FAIL,
  UPDATE_LAB_LOADING,
  UPDATE_LAB_RESET,
  UPDATE_LAB_SUCCESS,
} from "./consts";

const labControllerApi = new LaboratoryControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createLab =
  (labWithRowsDTO: LabWithRowsDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_LOADING,
    });

    labControllerApi.newLaboratoryUsingPOST({ labWithRowsDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_LAB_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_LAB_FAIL,
          error: error,
        });
      }
    );
  };

export const createLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_LAB_RESET,
    });
  };

export const updateLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_RESET,
    });
  };

export const deleteLabReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_LAB_RESET,
    });
  };

export const getLabsByPatientId =
  (patId: number | undefined) =>
  (dispatch: Dispatch<IAction<LaboratoryDTO[], {}>>): void => {
    dispatch({
      type: GET_LAB_LOADING,
    });
    if (patId) {
      labControllerApi.getLaboratoryUsingGET({ patId }).subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: GET_LAB_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_LAB_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_LAB_FAIL,
            error,
          });
        }
      );
    } else {
      dispatch({
        type: GET_LAB_FAIL,
        error: "The patient code should not be null",
      });
    }
  };

export const getMaterials =
  () =>
  (dispatch: Dispatch<IAction<string[], {}>>): void => {
    dispatch({
      type: GET_MATERIALS_LOADING,
    });
    labControllerApi.getMaterialsUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_MATERIALS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_MATERIALS_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_MATERIALS_FAIL,
          error,
        });
      }
    );
  };

export const updateLab =
  (code: number, labWithRowsDTO: LabWithRowsDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_LAB_LOADING,
    });

    labControllerApi
      .updateLaboratoryUsingPUT({ code, labWithRowsDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_LAB_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_LAB_FAIL,
            error: error,
          });
        }
      );
  };

export const deleteLab =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_LAB_LOADING,
    });
    labControllerApi.deleteExamUsingDELETE2({ code }).subscribe(
      () => {
        dispatch({
          type: DELETE_LAB_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_LAB_FAIL,
          error: error,
        });
      }
    );
  };
