import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import {
  BASE_PATH,
  Configuration,
  DiseaseDTO,
  WardControllerApi,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import { GET_WARD_FAIL, GET_WARD_LOADING, GET_WARD_SUCCESS } from "./consts";

const wardControllerApi = new WardControllerApi(
  new Configuration({
    middleware: [applyTokenMiddleware],
    basePath: process.env.API_BASE_PATH || BASE_PATH,
  })
);

export const getWards =
  () =>
  (dispatch: Dispatch<IAction<DiseaseDTO[], {}>>): void => {
    dispatch({
      type: GET_WARD_LOADING,
    });
    wardControllerApi.getWardsUsingGET().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_WARD_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_WARD_FAIL,
          error,
        });
      }
    );
  };
