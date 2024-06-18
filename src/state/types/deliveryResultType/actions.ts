import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import {
  DeliveryResultTypeApi,
  DeliveryResultTypeDTO,
} from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_DELIVERY_RESULT_TYPE_FAIL,
  CREATE_DELIVERY_RESULT_TYPE_LOADING,
  CREATE_DELIVERY_RESULT_TYPE_RESET,
  CREATE_DELIVERY_RESULT_TYPE_SUCCESS,
  DELETE_DELIVERY_RESULT_TYPE_FAIL,
  DELETE_DELIVERY_RESULT_TYPE_LOADING,
  DELETE_DELIVERY_RESULT_TYPE_RESET,
  DELETE_DELIVERY_RESULT_TYPE_SUCCESS,
  GET_DELIVERY_RESULT_TYPE_FAIL,
  GET_DELIVERY_RESULT_TYPE_LOADING,
  GET_DELIVERY_RESULT_TYPE_SUCCESS,
  GET_DELIVERY_RESULT_TYPE_SUCCESS_EMPTY,
  UPDATE_DELIVERY_RESULT_TYPE_FAIL,
  UPDATE_DELIVERY_RESULT_TYPE_LOADING,
  UPDATE_DELIVERY_RESULT_TYPE_RESET,
  UPDATE_DELIVERY_RESULT_TYPE_SUCCESS,
} from "./consts";

const deliveryResultTypeApi = new DeliveryResultTypeApi(customConfiguration());

export const getDeliveryResultType =
  () =>
  (dispatch: Dispatch<IAction<DeliveryResultTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DELIVERY_RESULT_TYPE_LOADING,
    });
    deliveryResultTypeApi.getDeliveryResultTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DELIVERY_RESULT_TYPE_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DELIVERY_RESULT_TYPE_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DELIVERY_RESULT_TYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createDeliveryResultType =
  (newDeliveryResultType: DeliveryResultTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DELIVERY_RESULT_TYPE_LOADING,
    });
    deliveryResultTypeApi
      .newDeliveryResultType({ deliveryResultTypeDTO: newDeliveryResultType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_DELIVERY_RESULT_TYPE_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_DELIVERY_RESULT_TYPE_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createDeliveryResultTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DELIVERY_RESULT_TYPE_RESET,
    });
  };

export const updateDeliveryResultType =
  (updateDeliveryResultType: DeliveryResultTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DELIVERY_RESULT_TYPE_LOADING,
    });
    deliveryResultTypeApi
      .updateDeliveryResultTypes({
        deliveryResultTypeDTO: updateDeliveryResultType,
      })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_DELIVERY_RESULT_TYPE_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_DELIVERY_RESULT_TYPE_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateDeliveryResultTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DELIVERY_RESULT_TYPE_RESET,
    });
  };

export const deleteDeliveryResultType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DELIVERY_RESULT_TYPE_LOADING,
    });
    deliveryResultTypeApi.deleteDeliveryResultType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_DELIVERY_RESULT_TYPE_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_DELIVERY_RESULT_TYPE_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteDeliveryResultTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DELIVERY_RESULT_TYPE_RESET,
    });
  };
