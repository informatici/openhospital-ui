import produce from "immer";
import { VaccineTypeDTO } from "../../../generated";
import { IAction } from "../../types";
import {
  CREATE_EXAM_TYPES_FAIL,
  CREATE_EXAM_TYPES_LOADING,
  CREATE_EXAM_TYPES_RESET,
  CREATE_EXAM_TYPES_SUCCESS,
  DELETE_EXAM_TYPES_FAIL,
  DELETE_EXAM_TYPES_LOADING,
  DELETE_EXAM_TYPES_RESET,
  DELETE_EXAM_TYPES_SUCCESS,
  GET_EXAM_TYPES_FAIL,
  GET_EXAM_TYPES_LOADING,
  GET_EXAM_TYPES_SUCCESS,
  GET_EXAM_TYPES_SUCCESS_EMPTY,
  UPDATE_EXAM_TYPES_FAIL,
  UPDATE_EXAM_TYPES_LOADING,
  UPDATE_EXAM_TYPES_RESET,
  UPDATE_EXAM_TYPES_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IExamTypesState } from "./types";

export default produce((draft: IExamTypesState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * Create exam type
     */
    case CREATE_EXAM_TYPES_LOADING: {
      draft.create.status = "LOADING";
      break;
    }

    case CREATE_EXAM_TYPES_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      draft.getAllExamTypes.data = [
        ...(draft.getAllExamTypes.data ?? []),
        action.payload,
      ];
      delete draft.create.error;
      break;
    }

    case CREATE_EXAM_TYPES_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      break;
    }

    case CREATE_EXAM_TYPES_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      break;
    }

    /**
     *  Get exam types
     */
    case GET_EXAM_TYPES_LOADING: {
      draft.getAllExamTypes.status = "LOADING";
      break;
    }

    case GET_EXAM_TYPES_SUCCESS: {
      draft.getAllExamTypes.status = "SUCCESS";
      draft.getAllExamTypes.data = action.payload;
      delete draft.getAllExamTypes.error;
      break;
    }

    case GET_EXAM_TYPES_FAIL: {
      draft.getAllExamTypes.status = "FAIL";
      draft.getAllExamTypes.error = action.error;
      break;
    }

    case GET_EXAM_TYPES_SUCCESS_EMPTY: {
      draft.getAllExamTypes.status = "SUCCESS_EMPTY";
      draft.getAllExamTypes.data = [];
      delete draft.getAllExamTypes.error;
      break;
    }

    /**
     * Update exam type
     */
    case UPDATE_EXAM_TYPES_LOADING: {
      draft.update.status = "LOADING";
      delete draft.update.error;
      break;
    }

    case UPDATE_EXAM_TYPES_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      draft.getAllExamTypes.data = draft.getAllExamTypes.data?.map((e) => {
        return e.code === action.payload.code
          ? (action.payload as VaccineTypeDTO)
          : e;
      });
      delete draft.update.error;
      break;
    }

    case UPDATE_EXAM_TYPES_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      break;
    }

    case UPDATE_EXAM_TYPES_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      break;
    }

    /**
     * Delete exam type
     */
    case DELETE_EXAM_TYPES_LOADING: {
      draft.delete.status = "LOADING";
      delete draft.delete.error;
      break;
    }

    case DELETE_EXAM_TYPES_SUCCESS: {
      draft.delete.status = "SUCCESS";
      draft.delete.data = action.payload.deleted;
      draft.getAllExamTypes.data = draft.getAllExamTypes.data?.filter((e) => {
        return e.code !== action.payload.code;
      });
      delete draft.delete.error;
      break;
    }

    case DELETE_EXAM_TYPES_FAIL: {
      draft.delete.status = "FAIL";
      draft.delete.error = action.error;
      break;
    }

    case DELETE_EXAM_TYPES_RESET: {
      draft.delete.status = "IDLE";
      delete draft.delete.error;
      break;
    }
  }
}, initial);
