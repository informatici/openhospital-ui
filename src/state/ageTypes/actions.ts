import { Dispatch } from "redux";
import {
  Configuration,
  AdmissionDTO,
  AgeTypeControllerApi,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_AGETYPES_FAIL,
  GET_AGETYPES_LOADING,
  GET_AGETYPES_SUCCESS,
  GET_AGETYPES_SUCCESS_EMPTY,
} from "./consts";

const ageTypeControllerApi = new AgeTypeControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getAgeTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_AGETYPES_LOADING,
    });
    ageTypeControllerApi.getAllAgeTypesUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_AGETYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_AGETYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_AGETYPES_FAIL,
          error,
        });
      }
    );
  };
