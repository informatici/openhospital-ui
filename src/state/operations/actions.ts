import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { OperationDTO, OperationRowDTO } from "../../generated";
import { OperationsApi } from "../../generated/apis/OperationsApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_OPERATIONROW_FAIL,
  CREATE_OPERATIONROW_LOADING,
  CREATE_OPERATIONROW_RESET,
  CREATE_OPERATIONROW_SUCCESS,
  CREATE_OPERATION_FAIL,
  CREATE_OPERATION_LOADING,
  CREATE_OPERATION_RESET,
  CREATE_OPERATION_SUCCESS,
  DELETE_OPERATIONROW_FAIL,
  DELETE_OPERATIONROW_LOADING,
  DELETE_OPERATIONROW_RESET,
  DELETE_OPERATIONROW_SUCCESS,
  DELETE_OPERATION_FAIL,
  DELETE_OPERATION_LOADING,
  DELETE_OPERATION_RESET,
  DELETE_OPERATION_SUCCESS,
  GET_OPERATIONROW_ADM_EMPTY,
  GET_OPERATIONROW_ADM_FAIL,
  GET_OPERATIONROW_ADM_LOADING,
  GET_OPERATIONROW_ADM_SUCCESS,
  GET_OPERATIONS_EMPTY,
  GET_OPERATIONS_FAIL,
  GET_OPERATIONS_LOADING,
  GET_OPERATIONS_SUCCESS,
  UPDATE_OPERATIONROW_FAIL,
  UPDATE_OPERATIONROW_LOADING,
  UPDATE_OPERATIONROW_RESET,
  UPDATE_OPERATIONROW_SUCCESS,
  UPDATE_OPERATION_FAIL,
  UPDATE_OPERATION_LOADING,
  UPDATE_OPERATION_RESET,
  UPDATE_OPERATION_SUCCESS,
} from "./consts";

const operationsApi = new OperationsApi(customConfiguration());

export const createOperationRow =
  (operationRowDTO: OperationRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPERATIONROW_LOADING,
    });
    operationsApi.newOperationRow({ operationRowDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_OPERATIONROW_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_OPERATIONROW_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateOperationRow =
  (operationRowDTO: OperationRowDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATIONROW_LOADING,
    });
    operationsApi.updateOperationRow({ operationRowDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_OPERATIONROW_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_OPERATIONROW_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteOperationRow =
  (code: number) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPERATIONROW_LOADING,
    });

    operationsApi.deleteOperationRow({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_OPERATIONROW_SUCCESS,
          payload: code,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_OPERATIONROW_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOperationRowReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPERATIONROW_RESET,
    });
  };

export const deleteOperationRowReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPERATIONROW_RESET,
    });
  };

export const updateOperationRowReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATIONROW_RESET,
    });
  };

export const getOperations =
  () =>
  (dispatch: Dispatch<IAction<OperationDTO[], {}>>): void => {
    dispatch({
      type: GET_OPERATIONS_LOADING,
    });
    operationsApi.getOperations().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_OPERATIONS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_OPERATIONS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_OPERATIONS_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const getOperationsByAdmissionId =
  (admissionId: number) =>
  (dispatch: Dispatch<IAction<OperationRowDTO[], {}>>): void => {
    dispatch({
      type: GET_OPERATIONROW_ADM_LOADING,
    });
    operationsApi.getOperationRowsByAdmt({ admissionId }).subscribe(
      (payload) => {
        if (!isEmpty(payload)) {
          dispatch({
            type: GET_OPERATIONROW_ADM_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_OPERATIONROW_ADM_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_OPERATIONROW_ADM_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOperation =
  (operationDTO: OperationDTO) =>
  (dispatch: Dispatch<IAction<OperationDTO, {}>>): void => {
    dispatch({
      type: CREATE_OPERATION_LOADING,
    });
    operationsApi.newOperation({ operationDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_OPERATION_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_OPERATION_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateOperation =
  (payload: { code: string; operationDTO: OperationDTO }) =>
  (dispatch: Dispatch<IAction<OperationDTO, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATION_LOADING,
    });
    operationsApi.updateOperation(payload).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_OPERATION_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_OPERATION_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteOperation =
  (code: string) =>
  (dispatch: Dispatch<IAction<boolean, {}>>): void => {
    dispatch({
      type: DELETE_OPERATION_LOADING,
    });
    operationsApi.deleteOperation({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_OPERATION_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_OPERATION_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createOperationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_OPERATION_RESET,
    });
  };

export const updateOperationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_OPERATION_RESET,
    });
  };

export const deleteOperationReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_OPERATION_RESET,
    });
  };
