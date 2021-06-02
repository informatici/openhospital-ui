import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { Configuration, OpdControllerApi, OpdDTO } from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import { GET_OPD_FAIL, GET_OPD_LOADING, GET_OPD_SUCCESS } from "./consts";

const opdControllerApi = new OpdControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getOpds =
  (code: number) =>
  (dispatch: Dispatch<IAction<OpdDTO[], {}>>): void => {
    dispatch({
      type: GET_OPD_LOADING,
    });
    opdControllerApi
      .getOpdByPatientUsingGET({
        pcode: code,
      })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_OPD_SUCCESS,
              payload: [payload],
            });
          } else {
            dispatch({
              type: GET_OPD_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_OPD_FAIL,
            error,
          });
        }
      );
  };
