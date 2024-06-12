import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { OperationsTypesApi, OperationTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_OPERATION_TYPES_FAIL,
  CREATE_OPERATION_TYPES_LOADING,
  CREATE_OPERATION_TYPES_RESET,
  CREATE_OPERATION_TYPES_SUCCESS,
  DELETE_OPERATION_TYPES_FAIL,
  DELETE_OPERATION_TYPES_LOADING,
  DELETE_OPERATION_TYPES_RESET,
  DELETE_OPERATION_TYPES_SUCCESS,
  GET_OPERATION_TYPES_FAIL,
  GET_OPERATION_TYPES_LOADING,
  GET_OPERATION_TYPES_SUCCESS,
  GET_OPERATION_TYPES_SUCCESS_EMPTY,
  UPDATE_OPERATION_TYPES_FAIL,
  UPDATE_OPERATION_TYPES_LOADING,
  UPDATE_OPERATION_TYPES_RESET,
  UPDATE_OPERATION_TYPES_SUCCESS,
} from "./consts";

const operationTypesApi = new OperationsTypesApi(customConfiguration());

export const getOperationTypes =
  () =>
  (dispatch: Dispatch<IAction<OperationTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_OPERATION_TYPES_LOADING,
    });
    operationTypesApi.getOperationTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_OPERATION_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_OPERATION_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_OPERATION_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOperationType =
  (operationTypeDTO: OperationTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPERATION_TYPES_LOADING,
    });
    operationTypesApi.newOperationType({ operationTypeDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_OPERATION_TYPES_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_OPERATION_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOperationTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPERATION_TYPES_RESET,
    });
  };

export const updateOperationType =
  (code: string, operationTypeDTO: OperationTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATION_TYPES_LOADING,
    });
    operationTypesApi
      .updateOperationTypes({ code, operationTypeDTO })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_OPERATION_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_OPERATION_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateOperationTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATION_TYPES_RESET,
    });
  };

export const deleteOperationType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPERATION_TYPES_LOADING,
    });
    operationTypesApi.deleteOperationType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_OPERATION_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_OPERATION_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteOperationTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPERATION_TYPES_RESET,
    });
  };
