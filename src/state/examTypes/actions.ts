import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { ExamTypeDTO } from "../../generated";
import { ExamTypesApi } from "../../generated/apis/ExamTypesApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_EXAMTYPE_FAIL,
  GET_EXAMTYPE_LOADING,
  GET_EXAMTYPE_SUCCESS,
} from "./consts";

const desaseTypesApi = new ExamTypesApi(customConfiguration());

export const getExamTypes =
  () =>
  (dispatch: Dispatch<IAction<ExamTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_EXAMTYPE_LOADING,
    });
    desaseTypesApi.getExamTypes().subscribe(
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
