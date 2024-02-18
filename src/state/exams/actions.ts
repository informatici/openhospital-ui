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
