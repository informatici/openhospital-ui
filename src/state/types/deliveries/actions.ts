import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { DeliveryTypeApi, DeliveryTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";
import { IAction } from "../../types";
import {
  CREATE_DELIVERY_TYPES_FAIL,
  CREATE_DELIVERY_TYPES_LOADING,
  CREATE_DELIVERY_TYPES_RESET,
  CREATE_DELIVERY_TYPES_SUCCESS,
  DELETE_DELIVERY_TYPES_FAIL,
  DELETE_DELIVERY_TYPES_LOADING,
  DELETE_DELIVERY_TYPES_RESET,
  DELETE_DELIVERY_TYPES_SUCCESS,
  GET_DELIVERY_TYPES_FAIL,
  GET_DELIVERY_TYPES_LOADING,
  GET_DELIVERY_TYPES_SUCCESS,
  GET_DELIVERY_TYPES_SUCCESS_EMPTY,
  UPDATE_DELIVERY_TYPES_FAIL,
  UPDATE_DELIVERY_TYPES_LOADING,
  UPDATE_DELIVERY_TYPES_RESET,
  UPDATE_DELIVERY_TYPES_SUCCESS,
} from "./consts";

const deliveryTypesApi = new DeliveryTypeApi(customConfiguration());

export const getDeliveryTypes =
  () =>
  (dispatch: Dispatch<IAction<DeliveryTypeDTO[], {}>>): void => {
    dispatch({
      type: GET_DELIVERY_TYPES_LOADING,
    });
    deliveryTypesApi.getDeliveryTypes({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_DELIVERY_TYPES_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_DELIVERY_TYPES_SUCCESS_EMPTY,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_DELIVERY_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createDeliveryType =
  (newDeliveryType: DeliveryTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DELIVERY_TYPES_LOADING,
    });
    deliveryTypesApi
      .newDeliveryType({ deliveryTypeDTO: newDeliveryType })
      .subscribe(
        (payload) => {
          dispatch({
            type: CREATE_DELIVERY_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: CREATE_DELIVERY_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const createDeliveryTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_DELIVERY_TYPES_RESET,
    });
  };

export const updateDeliveryType =
  (updateDeliveryType: DeliveryTypeDTO) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DELIVERY_TYPES_LOADING,
    });
    deliveryTypesApi
      .updateDeliveryTypes({ deliveryTypeDTO: updateDeliveryType })
      .subscribe(
        (payload) => {
          dispatch({
            type: UPDATE_DELIVERY_TYPES_SUCCESS,
            payload: payload,
          });
        },
        (error) => {
          dispatch({
            type: UPDATE_DELIVERY_TYPES_FAIL,
            error: error?.response,
          });
        }
      );
  };

export const updateDeliveryTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_DELIVERY_TYPES_RESET,
    });
  };

export const deleteDeliveryType =
  (code: string) =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DELIVERY_TYPES_LOADING,
    });
    deliveryTypesApi.deleteDeliveryType({ code }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_DELIVERY_TYPES_SUCCESS,
          payload: { deleted: payload, code },
        });
      },
      (error) => {
        dispatch({
          type: DELETE_DELIVERY_TYPES_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteDeliveryTypeReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_DELIVERY_TYPES_RESET,
    });
  };
