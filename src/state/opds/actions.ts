import isEmpty from "lodash.isempty";
import { Dispatch } from "redux";
import { Configuration, OpdControllerApi, OpdDTO } from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { IAction } from "../types";
import {
  CREATE_OPD_RESET,
  CREATE_OPD_LOADING,
  CREATE_OPD_SUCCESS,
  CREATE_OPD_FAIL,
  GET_OPD_FAIL,
  GET_OPD_LOADING,
  GET_OPD_SUCCESS,
} from "./consts";

const opdControllerApi = new OpdControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createOpd =
  (opdDTO: OpdDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_LOADING,
    });
    if (
      opdDTO.disease !== "" &&
      opdDTO.disease2 !== "" &&
      opdDTO.disease3 !== "" &&
      opdDTO.date !== "0"
    ) {
      opdControllerApi.newOpdUsingPOST({ opdDTO }).subscribe(
        () => {
          dispatch({
            type: CREATE_OPD_SUCCESS,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_OPD_FAIL,
            error,
          });
        }
      );
    } else {
      dispatch({
        type: CREATE_OPD_FAIL,
        error: "choose disease before",
      });
    }
  };

export const createOpdReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_RESET,
    });
  };

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
