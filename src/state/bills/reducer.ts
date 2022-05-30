import produce from "immer";
import { FullBillDTO } from "../../generated";
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
  CLOSE_BILL_LOADING,
  CLOSE_BILL_SUCCESS,
  CLOSE_BILL_FAIL,
  CLOSE_BILL_RESET,
  UPDATE_BILL_LOADING,
  UPDATE_BILL_SUCCESS,
  UPDATE_BILL_FAIL,
  UPDATE_BILL_RESET,
  SEARCH_BILLS_BY_YEAR_LOADING,
  SEARCH_BILLS_BY_YEAR_SUCCESS,
  SEARCH_BILLS_BY_YEAR_FAIL,
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
      draft.getPendingBills.data = [
        ...(draft.getPendingBills.data ?? []),
        action.payload,
      ];
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

    /**
     * UPDATE_BILL
     */
    case UPDATE_BILL_LOADING: {
      draft.updateBill.status = "LOADING";
      break;
    }

    case UPDATE_BILL_SUCCESS: {
      draft.updateBill.status = "SUCCESS";
      draft.getPendingBills.data = draft.getPendingBills.data?.map((e) => {
        return e.bill?.id === action.payload?.bill?.id
          ? (action.payload as FullBillDTO)
          : e;
      });
      delete draft.updateBill.error;
      break;
    }

    case UPDATE_BILL_FAIL: {
      draft.updateBill.status = "FAIL";
      draft.updateBill.error = action.error;
      break;
    }

    case UPDATE_BILL_RESET: {
      draft.updateBill.status = "IDLE";
      delete draft.updateBill.error;
      break;
    }

    /**
     * GET_BILL
     */
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
      draft.getPendingBills.data = draft.getPendingBills.data?.filter(
        (e) => e.bill?.id !== action.payload
      );
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
      draft.getPendingBills.data = draft.getPendingBills.data?.map((e) => {
        return e.bill?.id === action.payload?.bill?.id
          ? (action.payload as FullBillDTO)
          : e;
      });
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

    // pay bill
    case CLOSE_BILL_LOADING: {
      draft.closeBill.status = "LOADING";
      break;
    }

    case CLOSE_BILL_SUCCESS: {
      draft.closeBill.status = "SUCCESS";
      draft.getPendingBills.data = draft.getPendingBills.data?.filter(
        (e) => e.bill?.id !== action.payload?.bill?.id
      );
      delete draft.closeBill.error;
      break;
    }

    case CLOSE_BILL_FAIL: {
      draft.closeBill.status = "FAIL";
      draft.closeBill.error = action.error;
      break;
    }

    case CLOSE_BILL_RESET: {
      draft.closeBill.status = "IDLE";
      delete draft.closeBill.error;
      break;
    }

    //get bills by year

    case SEARCH_BILLS_BY_YEAR_LOADING: {
      draft.getBillsByYear.status = "LOADING";
      break;
    }

    case SEARCH_BILLS_BY_YEAR_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getBillsByYear.status = "SUCCESS";
      } else {
        draft.getBillsByYear.status = "SUCCESS_EMPTY";
      }
      draft.getBillsByYear.data = action.payload;
      delete draft.getBillsByYear.error;
      break;
    }

    case SEARCH_BILLS_BY_YEAR_FAIL: {
      draft.getBillsByYear.status = "FAIL";
      draft.getBillsByYear.error = action.error;
      break;
    }
  }
}, initial);
