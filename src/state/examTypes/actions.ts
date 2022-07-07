import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  Configuration,
  ExamControllerApi,
  ExamDTO,
  ExamTypeControllerApi,
  ExamTypeDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_EXAMTYPE_FAIL,
  GET_EXAMTYPE_LOADING,
  GET_EXAMTYPE_SUCCESS,
} from "./consts";

const desaseTypeControllerApi = new ExamTypeControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getExamTypes =
  () =>
  (dispatch: Dispatch<IAction<ExamTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_EXAMTYPE_LOADING,
    });
    desaseTypeControllerApi.getExamTypesUsingGET().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_EXAMTYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_EXAMTYPE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_EXAMTYPE_FAIL,
          error,
        });
      }
    );
  };
