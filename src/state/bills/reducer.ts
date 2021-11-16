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
  SEARCH_BILL_FAIL,
  PENDING_BILL_LOADING,
  PENDING_BILL_SUCCESS,
  PENDING_BILL_FAIL,
  SEARCH_PAYMENTS_LOADING,
  SEARCH_PAYMENTS_SUCCESS,
  SEARCH_PAYMENTS_FAIL,
  DELETE_BILL_FAIL,
  DELETE_BILL_LOADING,
  DELETE_BILL_SUCCESS,
  DELETE_BILL_RESET,
  EDIT_BILL_LOADING,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_FAIL,
  EDIT_BILL_RESET,
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

    case SEARCH_BILL_FAIL: {
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

    //search payments

    case SEARCH_PAYMENTS_LOADING: {
      draft.searchPayments.status = "LOADING";
      break;
    }

    case SEARCH_PAYMENTS_SUCCESS: {
      if (action.payload.length > 0) {
        draft.searchPayments.status = "SUCCESS";
      } else {
        draft.searchPayments.status = "SUCCESS_EMPTY";
      }
      draft.searchPayments.data = action.payload;
      delete draft.searchPayments.error;
      break;
    }

    case SEARCH_PAYMENTS_FAIL: {
      draft.searchPayments.status = "FAIL";
      draft.searchPayments.error = action.error;
      break;
    }

    //delete bill
    case DELETE_BILL_LOADING: {
      draft.delete.status = "LOADING";
      break;
    }

    case DELETE_BILL_SUCCESS: {
      draft.delete.status = "SUCCESS";
      delete draft.delete.error;
      break;
    }

    case DELETE_BILL_FAIL: {
      draft.delete.status = "FAIL";
      draft.delete.error = action.error;
      break;
    }

    case DELETE_BILL_RESET: {
      draft.delete.status = "IDLE";
      delete draft.delete.error;
      break;
    }

    // pay bill
    case EDIT_BILL_LOADING: {
      draft.payBill.status = "LOADING";
      break;
    }

    case EDIT_BILL_SUCCESS: {
      draft.payBill.status = "SUCCESS";
      delete draft.payBill.error;
      break;
    }

    case EDIT_BILL_FAIL: {
      draft.payBill.status = "FAIL";
      draft.payBill.error = action.error;
      break;
    }

    case EDIT_BILL_RESET: {
      draft.payBill.status = "IDLE";
      delete draft.payBill.error;
      break;
    }
  }
}, initial);
