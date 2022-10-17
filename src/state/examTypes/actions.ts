import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { ExamTypeControllerApi, ExamTypeDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_EXAMTYPE_FAIL,
  GET_EXAMTYPE_LOADING,
  GET_EXAMTYPE_SUCCESS,
} from "./consts";

const desaseTypeControllerApi = new ExamTypeControllerApi(
  customConfiguration()
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
          error: error?.response,
        });
      }
    );
  };
