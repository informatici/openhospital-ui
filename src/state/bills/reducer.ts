import produce from "immer";
import { IAction } from "../types";
import {
    NEW_BILL_FAIL,
    NEW_BILL_LOADING,
    NEW_BILL_SUCCESS,
    NEW_BILL_RESET,
    GET_BILL_SUCCESS,
    GET_BILL_LOADING,
    GET_BILL_FAIL
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
    }
}, initial);