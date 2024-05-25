import produce from "immer";
import { IAction } from "../types";
import {
  GET_OPERATIONTYPE_FAIL,
  GET_OPERATIONTYPE_LOADING,
  GET_OPERATIONTYPE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IOperationTypeState } from "./types";

export default produce(
  (draft: IOperationTypeState, action: IAction<any, any>) => {
    switch (action.type) {
      case GET_OPERATIONTYPE_LOADING: {
        draft.getOperationTypes.status = "LOADING";
        break;
      }

      case GET_OPERATIONTYPE_SUCCESS: {
        draft.getOperationTypes.status = "SUCCESS";
        draft.getOperationTypes.data = action.payload;
        delete draft.getOperationTypes.error;
        break;
      }

      case GET_OPERATIONTYPE_FAIL: {
        draft.getOperationTypes.status = "FAIL";
        draft.getOperationTypes.error = action.error;
        break;
      }
    }
  },
  initial
);
