import produce from "immer";
import { IAction } from "../types";
import {
  GET_EXAMROW_FAIL,
  GET_EXAMROW_LOADING,
  GET_EXAMROW_SUCCESS,
  GET_EXAM_FAIL,
  GET_EXAM_LOADING,
  GET_EXAM_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IExamState } from "./types";

export default produce((draft: IExamState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_EXAMS
     */
    case GET_EXAM_LOADING: {
      draft.examList.status = "LOADING";
      break;
    }

    case GET_EXAM_SUCCESS: {
      draft.examList.status = "SUCCESS";
      draft.examList.data = action.payload;
      delete draft.examList.error;
      break;
    }

    case GET_EXAM_FAIL: {
      draft.examList.status = "FAIL";
      draft.examList.error = action.error;
      break;
    }

    /**
     * GET_EXAMROWS
     */
    case GET_EXAMROW_LOADING: {
      draft.examRowsByExamCode.status = "LOADING";
      draft.examRowsByExamCode.data = [];
      break;
    }

    case GET_EXAMROW_SUCCESS: {
      draft.examRowsByExamCode.status = "SUCCESS";
      draft.examRowsByExamCode.data = action.payload;
      delete draft.examRowsByExamCode.error;
      break;
    }

    case GET_EXAMROW_FAIL: {
      draft.examRowsByExamCode.status = "FAIL";
      draft.examRowsByExamCode.error = action.error;
      break;
    }
  }
}, initial);
