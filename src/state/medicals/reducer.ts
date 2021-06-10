import produce from "immer";
import { IAction } from "../types";
import {
  GET_MEDICAL_FAIL,
  GET_MEDICAL_LOADING,
  GET_MEDICAL_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IMedicalState } from "./types";

export default produce((draft: IMedicalState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_MEDICALS
     */
    case GET_MEDICAL_LOADING: {
      draft.medicalsList.status = "LOADING";
      break;
    }

    case GET_MEDICAL_SUCCESS: {
      if (action.payload.length > 0) {
        draft.medicalsList.status = "SUCCESS";
      } else {
        draft.medicalsList.status = "SUCCESS_EMPTY";
      }
      draft.medicalsList.data = action.payload;
      delete draft.medicalsList.error;
      break;
    }

    case GET_MEDICAL_FAIL: {
      draft.medicalsList.status = "FAIL";
      draft.medicalsList.error = action.error;
      break;
    }
  }
}, initial);
