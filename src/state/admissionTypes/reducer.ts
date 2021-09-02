import produce from "immer";
import { IAction } from "../types";
import {
  GET_ADMISSIONTYPE_FAIL,
  GET_ADMISSIONTYPE_LOADING,
  GET_ADMISSIONTYPE_SUCCESS,
  GET_ADMISSIONTYPE_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IAdmissionTypeState } from "./types";

export default produce(
  (draft: IAdmissionTypeState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * GET_ADMISSIONTYPE
       */
      case GET_ADMISSIONTYPE_LOADING: {
        draft.allAdmissionTypes.status = "LOADING";
        break;
      }

      case GET_ADMISSIONTYPE_SUCCESS: {
        draft.allAdmissionTypes.status = "SUCCESS";
        draft.allAdmissionTypes.data = action.payload;
        delete draft.allAdmissionTypes.error;
        break;
      }

      case GET_ADMISSIONTYPE_SUCCESS_EMPTY: {
        draft.allAdmissionTypes.status = "SUCCESS_EMPTY";
        draft.allAdmissionTypes.data = [];
        delete draft.allAdmissionTypes.error;
        break;
      }
      case GET_ADMISSIONTYPE_FAIL: {
        draft.allAdmissionTypes.status = "FAIL";
        draft.allAdmissionTypes.error = action.error;
        break;
      }
    }
  },
  initial
);
