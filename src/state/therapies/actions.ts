import { Dispatch } from "redux";
import {
  BASE_PATH,
  Configuration,
  ReplaceTherapiesUsingPOSTRequest,
  TherapyControllerApi,
  TherapyRowDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_THERAPY_FAIL,
  CREATE_THERAPY_LOADING,
  CREATE_THERAPY_RESET,
  CREATE_THERAPY_SUCCESS,
  DELETE_THERAPY_FAIL,
  DELETE_THERAPY_RESET,
  GET_THERAPY_FAIL,
  GET_THERAPY_LOADING,
  GET_THERAPY_SUCCESS,
  GET_THERAPY_SUCCESS_EMPTY,
  UPDATE_THERAPY_FAIL,
  UPDATE_THERAPY_LOADING,
  UPDATE_THERAPY_RESET,
  UPDATE_THERAPY_SUCCESS,
} from "./consts";

const therapyControllerApi = new TherapyControllerApi(
  new Configuration({
    middleware: [applyTokenMiddleware],
    basePath: process.env.API_BASE_PATH || BASE_PATH,
  })
);

export const createTherapy =
  (thRowDTO: TherapyRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_THERAPY_LOADING,
    });
    therapyControllerApi.newTherapyUsingPOST({ thRowDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_THERAPY_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_THERAPY_FAIL,
          error: error,
        });
      }
    );
  };

export const updateTherapy =
  (thRowDTO: TherapyRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_THERAPY_LOADING,
    });
    therapyControllerApi
      .replaceTherapiesUsingPOST({
        thRowDTOs: [thRowDTO],
      } as ReplaceTherapiesUsingPOSTRequest)
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_THERAPY_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_THERAPY_FAIL,
            error: error,
          });
        }
      );
  };

export const createTherapyReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_THERAPY_RESET,
    });
  };

export const deleteTherapyReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_THERAPY_RESET,
    });
  };

export const updateTherapyReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_THERAPY_RESET,
    });
  };

export const getTherapiesByPatientId =
  (codePatient: number | undefined) =>
  (dispatch: Dispatch<IAction<TherapyRowDTO[], {}>>): void => {
    dispatch({
      type: GET_THERAPY_LOADING,
    });
    if (codePatient) {
      therapyControllerApi.getTherapyRowsUsingGET({ codePatient }).subscribe(
        (payload) => {
          if (Array.isArray(payload) && payload.length > 0) {
            dispatch({
              type: GET_THERAPY_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_THERAPY_SUCCESS_EMPTY,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_THERAPY_FAIL,
            error,
          });
        }
      );
    } else {
      dispatch({
        type: GET_THERAPY_FAIL,
        error: "The patient code should not be null",
      });
    }
  };

export const deleteTherapy =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    /**
     * endpoint not available
     */
    dispatch({
      type: DELETE_THERAPY_FAIL,
      error: "delete feature not yet available!!!",
    });
  };
