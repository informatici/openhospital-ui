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
      draft.loadSummaryData.status = "LOADING";
      break;
    }

    case GET_SUMMARY_SUCCESS: {
      draft.loadSummaryData.status = "SUCCESS";
      console.log("summary data", action.payload);
      draft.loadSummaryData.data = action.payload;
      delete draft.loadSummaryData.error;
      break;
    }

    case GET_SUMMARY_FAIL: {
      draft.loadSummaryData.status = "FAIL";
      break;
    }
  }
}, initial);
