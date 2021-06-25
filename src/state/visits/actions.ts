import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { Configuration, VisitDTO, VisitsControllerApi } from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import { GET_VISIT_FAIL, GET_VISIT_LOADING, GET_VISIT_SUCCESS } from "./consts";

const visitsControllerApi = new VisitsControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const getVisits =
  (code: number) =>
  (dispatch: Dispatch<IAction<VisitDTO[], {}>>): void => {
    dispatch({
      type: GET_VISIT_LOADING,
    });
    visitsControllerApi
      .getVisitUsingGET({
        patID: code,
      })
      .subscribe(
        (payload) => {
          if (typeof payload === "object" && !isEmpty(payload)) {
            dispatch({
              type: GET_VISIT_SUCCESS,
              payload: [payload],
            });
          } else {
            dispatch({
              type: GET_VISIT_SUCCESS,
              payload: [],
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_VISIT_FAIL,
            error,
          });
        }
      );
  };
