import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_LOADING,
  GET_SUPPLIERS_SUCCESS,
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
