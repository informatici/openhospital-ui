import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { ExamDTO, ExamRowDTO } from "../../generated";
import { ExamsApi } from "../../generated/apis/ExamsApi";
import { ExamRowsApi } from "../../generated/apis/ExamRowsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_EXAMROW_FAIL,
  GET_EXAMROW_LOADING,
  GET_EXAMROW_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_LOADING,
  GET_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_LOADING,
  CREATE_EXAM_RESET,
  CREATE_EXAM_SUCCESS,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_LOADING,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_RESET,
  UPDATE_EXAM_FAIL,
  UPDATE_EXAM_LOADING,
  UPDATE_EXAM_RESET,
  UPDATE_EXAM_SUCCESS,
} from "./consts";

const examsApi = new ExamsApi(customConfiguration());

const examRowsApi = new ExamRowsApi(customConfiguration());

export const getExams =
  () =>
  (dispatch: Dispatch<IAction<ExamDTO[], {}>>): void => {
    dispatch({
      type: GET_EXAM_LOADING,
    });
    examsApi.getExams().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_EXAM_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_EXAM_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_EXAM_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteExam =
  (code: string) =>
  (dispatch: Dispatch<IAction<boolean, {}>>): void => {
    dispatch({ type: DELETE_EXAM_LOADING });
    examsApi.deleteExam1({ code }).subscribe(
      (payload: boolean) => {
        dispatch({
          type: DELETE_EXAM_SUCCESS,
          payload,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_EXAM_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createExam =
  (examDTO: ExamDTO) =>
  (dispatch: Dispatch<IAction<ExamDTO, {}>>): void => {
    dispatch({
      type: CREATE_EXAM_LOADING,
    });
    examsApi.newExam({ examDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_EXAM_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_EXAM_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createExamReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAM_RESET,
    });
  };

export const deleteExamReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_EXAM_RESET,
    });
  };

export const updateExam =
  (examDTO: ExamDTO) =>
  (
    dispatch: Dispatch<IAction<{ code: string; examDTO: ExamDTO }, {}>>
  ): void => {
    dispatch({
      type: UPDATE_EXAM_LOADING,
    });
    examsApi.updateExams({ code: examDTO.code!, examDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_EXAM_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_EXAM_FAIL,
          error: error?.response,
        });
      }
    );
  };
export const updateExamReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_EXAM_RESET,
    });
  };

export const getExamRows =
  (examCode: string) =>
  (dispatch: Dispatch<IAction<ExamRowDTO[], {}>>): void => {
    if (examCode !== "") {
      dispatch({
        type: GET_EXAMROW_LOADING,
      });
      examRowsApi.getExamRowsByExamCode({ examCode }).subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_EXAMROW_SUCCESS,
              payload: payload,
            });
          } else {
            dispatch({
              type: GET_EXAMROW_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_EXAMROW_FAIL,
            error,
          });
        }
      );
    } else {
      dispatch({
        type: GET_EXAMROW_FAIL,
        error: "Exam code should not be null",
      });
    }
  };
