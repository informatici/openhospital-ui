import produce from "immer";
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
import { initial } from "./initial";
import { ISupplierState } from "./types";

export default produce((draft: ISupplierState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_SUPPLIERS
     */
    case GET_SUPPLIERS_LOADING: {
      draft.supplierList.status = "LOADING";
      break;
    }

    case GET_SUPPLIERS_SUCCESS: {
      draft.supplierList.status = "SUCCESS";
      draft.supplierList.data = action.payload;
      delete draft.supplierList.error;
      break;
    }

    case GET_SUPPLIERS_FAIL: {
      draft.supplierList.status = "FAIL";
      draft.supplierList.error = action.error;
      break;
    }

    /**
     * CREATE_SUPPLIER
     */
    case CREATE_SUPPLIER_LOADING: {
      draft.create.status = "LOADING";
      draft.create.hasSucceeded = false;
      draft.create.isLoading = true;
      break;
    }

    case CREATE_SUPPLIER_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      draft.create.hasSucceeded = true;
      draft.create.isLoading = false;
      delete draft.create.error;
      break;
    }

    case CREATE_SUPPLIER_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      draft.create.hasSucceeded = false;
      draft.create.isLoading = false;
      break;
    }

    case CREATE_SUPPLIER_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      delete draft.create.data;
      draft.create.hasSucceeded = false;
      draft.create.isLoading = false;
      break;
    }

    /**
     * UPDATE_SUPPLIER
     */
    case UPDATE_SUPPLIER_LOADING: {
      draft.update.status = "LOADING";
      draft.update.hasSucceeded = false;
      draft.update.isLoading = true;
      break;
    }

    case UPDATE_SUPPLIER_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      draft.update.hasSucceeded = true;
      draft.update.isLoading = false;
      delete draft.update.error;
      break;
    }

    case UPDATE_SUPPLIER_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      draft.update.hasSucceeded = false;
      draft.update.isLoading = false;
      break;
    }

    case UPDATE_SUPPLIER_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      delete draft.update.data;
      draft.update.hasSucceeded = false;
      draft.update.isLoading = false;
      break;
    }
  }
}, initial);
