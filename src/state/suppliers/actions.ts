import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  CREATE_SUPPLIER_FAIL,
  CREATE_SUPPLIER_LOADING,
  CREATE_SUPPLIER_RESET,
  CREATE_SUPPLIER_SUCCESS,
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_LOADING,
  GET_SUPPLIERS_SUCCESS,
  UPDATE_SUPPLIER_FAIL,
  UPDATE_SUPPLIER_LOADING,
  UPDATE_SUPPLIER_RESET,
  UPDATE_SUPPLIER_SUCCESS,
} from "./consts";
import { SupplierDTO, SuppliersApi } from "../../generated";

const suppliersApi = new SuppliersApi(customConfiguration());

export const getSuppliers =
  () =>
  (dispatch: Dispatch<IAction<SupplierDTO[], {}>>): void => {
    dispatch({
      type: GET_SUPPLIERS_LOADING,
    });
    suppliersApi.getSuppliers({}).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_SUPPLIERS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_SUPPLIERS_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_SUPPLIERS_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createSupplier =
  (supplierDTO: SupplierDTO) =>
  (dispatch: Dispatch<IAction<SupplierDTO, {}>>): void => {
    dispatch({
      type: CREATE_SUPPLIER_LOADING,
    });
    suppliersApi.saveSupplier({ supplierDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_SUPPLIER_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_SUPPLIER_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateSupplier =
  (supplierDTO: SupplierDTO) =>
  (dispatch: Dispatch<IAction<SupplierDTO, {}>>): void => {
    dispatch({
      type: UPDATE_SUPPLIER_LOADING,
    });
    suppliersApi.updateSupplier({ supplierDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_SUPPLIER_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_SUPPLIER_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createSupplierReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_SUPPLIER_RESET,
    });
  };

export const updateSupplierReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_SUPPLIER_RESET,
    });
  };
