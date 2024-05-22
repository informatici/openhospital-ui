import produce from "immer";
import { IAction } from "../types";
import {
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_LOADING,
  GET_SUPPLIERS_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { ISupplierState } from "./types";

export default produce((draft: ISupplierState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_EXAMS
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
  }
}, initial);
