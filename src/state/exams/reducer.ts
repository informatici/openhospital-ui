import produce from "immer";
import { IAction } from "../types";
import {
  GET_EXAM_FAIL,
  GET_EXAM_LOADING,
  GET_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_LOADING,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_RESET,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_LOADING,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_RESET,
  UPDATE_EXAM_FAIL,
  UPDATE_EXAM_LOADING,
  UPDATE_EXAM_SUCCESS,
  UPDATE_EXAM_RESET,
  GET_EXAMROW_FAIL,
  GET_EXAMROW_LOADING,
  GET_EXAMROW_SUCCESS,
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
     * CREATE_EXAMS
     */

    case CREATE_EXAM_LOADING: {
      draft.examCreate.status = "LOADING";
      break;
    }

    case CREATE_EXAM_SUCCESS: {
      draft.examCreate.status = "SUCCESS";
      draft.examCreate.data = action.payload;
      delete draft.examCreate.error;
      break;
    }

    case CREATE_EXAM_FAIL: {
      draft.examCreate.status = "FAIL";
      draft.examCreate.error = action.error;
      break;
    }

    case CREATE_EXAM_RESET: {
      draft.examCreate.status = "IDLE";
      delete draft.examCreate.error;
      delete draft.examCreate.data;
      break;
    }

    /**
     * UPDATE_EXAMS
     */

    case UPDATE_EXAM_LOADING: {
      draft.examUpdate.status = "LOADING";
      break;
    }

    case UPDATE_EXAM_SUCCESS: {
      draft.examUpdate.status = "SUCCESS";
      draft.examUpdate.data = action.payload;
      delete draft.examUpdate.error;
      break;
    }

    case UPDATE_EXAM_FAIL: {
      draft.examUpdate.status = "FAIL";
      draft.examUpdate.error = action.error;
      break;
    }

    case UPDATE_EXAM_RESET: {
      draft.examUpdate.status = "IDLE";
      delete draft.examUpdate.error;
      delete draft.examUpdate.data;
      break;
    }

    /**
     * DELETE_EXAMS
     */
    case DELETE_EXAM_LOADING: {
      draft.examDelete.status = "LOADING";
      break;
    }

    case DELETE_EXAM_SUCCESS: {
      draft.examDelete.status = "SUCCESS";
      delete draft.examDelete.error;
      break;
    }

    case DELETE_EXAM_FAIL: {
      draft.examDelete.status = "FAIL";
      draft.examDelete.error = action.error;
      break;
    }

    case DELETE_EXAM_RESET: {
      draft.examDelete.status = "IDLE";
      delete draft.examDelete.error;
      delete draft.examDelete.data;
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
