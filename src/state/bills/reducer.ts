import produce from "immer";
import { IAction } from "../types";
import {
  NEW_BILL_FAIL,
  NEW_BILL_LOADING,
  NEW_BILL_SUCCESS,
  NEW_BILL_RESET,
  GET_BILL_SUCCESS,
  GET_BILL_LOADING,
  GET_BILL_FAIL,
  SEARCH_BILL_LOADING,
  SEARCH_BILL_SUCCESS,
  PENDING_BILL_LOADING,
  PENDING_BILL_SUCCESS,
  PENDING_BILL_FAIL,
} from "./consts";
import { initial } from "./initial";
import { IBillsState } from "./types";

export default produce((draft: IBillsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * NEW_BILL
     */
    case NEW_BILL_LOADING: {
      draft.newBill.status = "LOADING";
      break;
    }

    case NEW_BILL_SUCCESS: {
      draft.newBill.status = "SUCCESS";
      delete draft.newBill.error;
      break;
    }

    case NEW_BILL_FAIL: {
      draft.newBill.status = "FAIL";
      draft.newBill.error = action.error;
      break;
    }

    case NEW_BILL_RESET: {
      draft.newBill.status = "IDLE";
      delete draft.newBill.error;
      break;
    }

    case GET_BILL_LOADING: {
      draft.getBill.status = "LOADING";
      break;
    }

    case GET_BILL_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getBill.status = "SUCCESS";
      } else {
        draft.getBill.status = "SUCCESS_EMPTY";
      }
      draft.getBill.data = action.payload;
      delete draft.getBill.error;
      break;
    }

    case GET_BILL_FAIL: {
      draft.getBill.status = "FAIL";
      draft.getBill.error = action.error;
      break;
    }

    //search bills

    case SEARCH_BILL_LOADING: {
      draft.searchBills.status = "LOADING";
      break;
    }

    case SEARCH_BILL_SUCCESS: {
      if (action.payload.length > 0) {
        draft.searchBills.status = "SUCCESS";
      } else {
        draft.searchBills.status = "SUCCESS_EMPTY";
      }
      draft.searchBills.data = action.payload;
      delete draft.searchBills.error;
      break;
    }

    case GET_BILL_FAIL: {
      draft.searchBills.status = "FAIL";
      draft.searchBills.error = action.error;
      break;
    }

    //pending bills

    case PENDING_BILL_LOADING: {
      draft.getPendingBills.status = "LOADING";
      break;
    }

    case PENDING_BILL_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getPendingBills.status = "SUCCESS";
      } else {
        draft.getPendingBills.status = "SUCCESS_EMPTY";
      }
      draft.getPendingBills.data = action.payload;
      delete draft.getPendingBills.error;
      break;
    }

    case PENDING_BILL_FAIL: {
      draft.getPendingBills.status = "FAIL";
      draft.getPendingBills.error = action.error;
      break;
    }
  }
}, initial);
