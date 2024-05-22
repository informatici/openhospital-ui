import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { OperationTypeDTO, OperationsTypesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_OPERATIONTYPE_FAIL,
  GET_OPERATIONTYPE_LOADING,
  GET_OPERATIONTYPE_SUCCESS,
} from "./consts";

const operationTypesApi = new OperationsTypesApi(customConfiguration());

export const getOperationTypes =
  () =>
  (dispatch: Dispatch<IAction<OperationTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_OPERATIONTYPE_LOADING,
    });
    operationTypesApi.getOperationTypes().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_OPERATIONTYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_OPERATIONTYPE_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_OPERATIONTYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };
