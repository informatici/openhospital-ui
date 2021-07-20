import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  ExaminationControllerApi,
  PatientExaminationDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_EXAMINATION_FAIL,
  CREATE_EXAMINATION_LOADING,
  CREATE_EXAMINATION_RESET,
  CREATE_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_FAIL,
  SEARCH_EXAMINATION_LOADING,
  SEARCH_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_SUCCESS_EMPTY,
} from "./consts";

const examinationControllerApi = new ExaminationControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createExamination =
  (newPatientExamination: PatientExaminationDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAMINATION_LOADING,
    });
    examinationControllerApi
      .newPatientExaminationUsingPOST({ newPatientExamination })
      .subscribe(
        () => {
          dispatch({
            type: CREATE_EXAMINATION_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_EXAMINATION_FAIL,
            error,
          });
        }
      );
  };

export const createExaminationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAMINATION_RESET,
    });
  };

export const examinationsByPatientId =
  (patId: number | undefined) =>
  (dispatch: Dispatch<IAction<PatientExaminationDTO[], {}>>): void => {
    dispatch({
      type: SEARCH_EXAMINATION_LOADING,
    });
    if (patId) {
      examinationControllerApi
        .getByPatientIdUsingGET({ patId: patId })
        .subscribe(
          (payload) => {
            if (Array.isArray(payload) && payload.length > 0) {
              dispatch({
                type: SEARCH_EXAMINATION_SUCCESS,
                payload: payload,
              });
            } else {
              dispatch({
                type: SEARCH_EXAMINATION_SUCCESS_EMPTY,
                payload: [],
              });
            }
          },
          (error) => {
            dispatch({
              type: SEARCH_EXAMINATION_FAIL,
              error,
            });
          }
        );
    } else
      dispatch({
        type: SEARCH_EXAMINATION_FAIL,
        error: "patient object should not be empty",
      });
  };
