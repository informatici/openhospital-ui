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
      draft.summaryData.status = "LOADING";
      break;
    }
    case GET_SUMMARY_SUCCESS: {
      draft.summaryData.status = "SUCCESS";
      draft.summaryData.data = action.payload;
      delete draft.summaryData.error;
      break;
    }
    case GET_SUMMARY_FAIL: {
      draft.summaryData.status = "FAIL";
      break;
    }
  }
}, initial);
