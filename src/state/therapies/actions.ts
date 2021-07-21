import { Dispatch } from "redux";
import {
  Configuration,
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
  GET_THERAPY_FAIL,
  GET_THERAPY_LOADING,
  GET_THERAPY_SUCCESS,
  GET_THERAPY_SUCCESS_EMPTY,
} from "./consts";

const therapyControllerApi = new TherapyControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
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

export const createTherapyReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_THERAPY_RESET,
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
