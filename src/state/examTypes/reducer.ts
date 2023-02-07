import produce from "immer";
import { IAction } from "../types";
import {
  GET_EXAMTYPE_FAIL,
  GET_EXAMTYPE_LOADING,
  GET_EXAMTYPE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IExamTypeState } from "./types";

export default produce((draft: IExamTypeState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_EXAMTYPE_LOADING: {
      draft.getExamTypes.status = "LOADING";
      break;
    }

    case GET_EXAMTYPE_SUCCESS: {
      draft.getExamTypes.status = "SUCCESS";
      draft.getExamTypes.data = action.payload;
      delete draft.getExamTypes.error;
      break;
    }

    case GET_EXAMTYPE_FAIL: {
      draft.getExamTypes.status = "FAIL";
      draft.getExamTypes.error = action.error;
      break;
    }
  }
}, initial);
