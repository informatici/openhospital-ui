import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { ExamTypeDTO, ExamTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_EXAM_TYPES_FAIL,
  CREATE_EXAM_TYPES_LOADING,
  CREATE_EXAM_TYPES_RESET,
  CREATE_EXAM_TYPES_SUCCESS,
  DELETE_EXAM_TYPES_FAIL,
  DELETE_EXAM_TYPES_LOADING,
  DELETE_EXAM_TYPES_RESET,
  DELETE_EXAM_TYPES_SUCCESS,
  GET_EXAM_TYPES_FAIL,
  GET_EXAM_TYPES_LOADING,
  GET_EXAM_TYPES_SUCCESS,
  GET_EXAM_TYPES_SUCCESS_EMPTY,
  UPDATE_EXAM_TYPES_FAIL,
  UPDATE_EXAM_TYPES_LOADING,
  UPDATE_EXAM_TYPES_RESET,
  UPDATE_EXAM_TYPES_SUCCESS,
} from "./consts";

const examTypesApi = new ExamTypesApi(customConfiguration());

export const getExamTypes =
  () =>
  (dispatch: Dispatch<IAction<ExamTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_EXAM_TYPES_LOADING,
    });
    examTypesApi.getExamTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_EXAM_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_EXAM_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_EXAM_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createExamType =
  (newExamType: ExamTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAM_TYPES_LOADING,
    });
    examTypesApi.newExamType({ examTypeDTO: newExamType }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_EXAM_TYPES_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_EXAM_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createExamTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_EXAM_TYPES_RESET,
    });
  };

export const updateExamType =
  (updateExamType: ExamTypeDTO, code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_EXAM_TYPES_LOADING,
    });
    examTypesApi
      .updateExamType({ code, examTypeDTO: updateExamType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_EXAM_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_EXAM_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateExamTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_EXAM_TYPES_RESET,
    });
  };

export const deleteExamType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_EXAM_TYPES_LOADING,
    });
    examTypesApi.deleteExamType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_EXAM_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_EXAM_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteExamTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_EXAM_TYPES_RESET,
    });
  };
