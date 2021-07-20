import { Dispatch } from "redux";
import {
  Configuration,
  DiseaseDTO,
  OpdControllerApi,
  OpdDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { opdDataFormatter } from "../../libraries/formatUtils/dataFormatting";
import { IAction } from "../types";
import {
  CREATE_OPD_RESET,
  CREATE_OPD_LOADING,
  CREATE_OPD_SUCCESS,
  CREATE_OPD_FAIL,
  GET_OPD_FAIL,
  GET_OPD_LOADING,
  GET_OPD_SUCCESS,
  GET_OPD_SUCCESS_EMPTY,
} from "./consts";

const opdControllerApi = new OpdControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const createOpd =
  (opdValues: Record<string, any>, diseaseList: DiseaseDTO[] | undefined) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_LOADING,
    });
    const opdDTO = opdDataFormatter(opdValues, diseaseList);
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
  };

export const createOpdReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPD_RESET,
    });
  };

export const getOpds =
  (code: number | undefined) =>
  (dispatch: Dispatch<IAction<OpdDTO[], {}>>): void => {
    dispatch({
      type: GET_OPD_LOADING,
    });
    if (code) {
      opdControllerApi
        .getOpdByPatientUsingGET({
          pcode: code,
        })
        .subscribe(
          (payload) => {
            if (Array.isArray(payload) && payload.length > 0) {
              dispatch({
                type: GET_OPD_SUCCESS,
                payload: payload,
              });
            } else {
              dispatch({
                type: GET_OPD_SUCCESS_EMPTY,
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
    } else {
      dispatch({
        type: GET_OPD_FAIL,
        error: "patient code should not be empty",
      });
    }
  };
