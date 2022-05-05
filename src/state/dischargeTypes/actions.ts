import { Dispatch } from "redux";
import {
  Configuration,
  AdmissionDTO,
  DischargeTypeControllerApi,
  BASE_PATH,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  GET_DISCHARGETYPE_FAIL,
  GET_DISCHARGETYPE_LOADING,
  GET_DISCHARGETYPE_SUCCESS,
  GET_DISCHARGETYPE_SUCCESS_EMPTY,
} from "./consts";

const dischargeTypeControllerApi = new DischargeTypeControllerApi(
  new Configuration({
    middleware: [applyTokenMiddleware],
    basePath: process.env.API_BASE_PATH || BASE_PATH,
  })
);

export const getDischargeTypes =
  () =>
  (dispatch: Dispatch<IAction<AdmissionDTO[], {}>>): void => {
    dispatch({
      type: GET_DISCHARGETYPE_LOADING,
    });
    dischargeTypeControllerApi.getDischargeTypesUsingGET().subscribe(
      (payload) => {
        if (Array.isArray(payload) && payload.length > 0) {
          dispatch({
            type: GET_DISCHARGETYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DISCHARGETYPE_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DISCHARGETYPE_FAIL,
          error,
        });
      }
    );
  };
