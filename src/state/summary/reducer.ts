import produce from "immer";
import {
  GET_SUMMARY_FAIL,
  GET_SUMMARY_LOADING,
  GET_SUMMARY_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { ISummaryState } from "./types";

export default produce((draft: ISummaryState, action: any) => {
  switch (action.type) {
    case GET_SUMMARY_LOADING: {
      draft.summaryApisCall.status = "LOADING";
      break;
    }
    case GET_SUMMARY_SUCCESS: {
      draft.summaryApisCall.status = "SUCCESS";
      draft.summaryApisCall.data = action.payload;
      delete draft.summaryApisCall.error;
      break;
    }
    case GET_SUMMARY_FAIL: {
      draft.summaryApisCall.status = "FAIL";
      break;
    }
  }
}, initial);
