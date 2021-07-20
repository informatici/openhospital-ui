import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_EXAMINATION_FAIL,
  CREATE_EXAMINATION_LOADING,
  CREATE_EXAMINATION_RESET,
  CREATE_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_FAIL,
  SEARCH_EXAMINATION_LOADING,
  SEARCH_EXAMINATION_SUCCESS,
  SEARCH_EXAMINATION_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IExaminationsState } from "./types";

export default produce(
  (draft: IExaminationsState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * CREATE_EXAMINATION
       */
      case CREATE_EXAMINATION_LOADING: {
        draft.createExamination.status = "LOADING";
        break;
      }

      case CREATE_EXAMINATION_SUCCESS: {
        draft.createExamination.status = "SUCCESS";
        delete draft.createExamination.error;
        break;
      }

      case CREATE_EXAMINATION_FAIL: {
        draft.createExamination.status = "FAIL";
        draft.createExamination.error = action.error;
        break;
      }

      case CREATE_EXAMINATION_RESET: {
        draft.createExamination.status = "IDLE";
        delete draft.createExamination.error;
        break;
      }

      /**
       * SEARCH_EXAMINATION
       */
      case SEARCH_EXAMINATION_LOADING: {
        draft.examinationsByPatientId.status = "LOADING";
        break;
      }

      case SEARCH_EXAMINATION_SUCCESS: {
        draft.examinationsByPatientId.status = "SUCCESS";
        draft.examinationsByPatientId.data = action.payload;
        delete draft.examinationsByPatientId.error;
        break;
      }
      case SEARCH_EXAMINATION_SUCCESS_EMPTY: {
        draft.examinationsByPatientId.status = "SUCCESS_EMPTY";
        draft.examinationsByPatientId.data = [];
        delete draft.examinationsByPatientId.error;
        break;
      }
      case SEARCH_EXAMINATION_FAIL: {
        draft.examinationsByPatientId.status = "FAIL";
        draft.examinationsByPatientId.error = action.error;
        break;
      }
    }
  },
  initial
);
