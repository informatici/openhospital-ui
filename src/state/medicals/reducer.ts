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
      draft.medicalsOrderByName.status = "LOADING";
      break;
    }

    case GET_MEDICAL_SUCCESS: {
      if (action.payload.length > 0) {
        draft.medicalsOrderByName.status = "SUCCESS";
      } else {
        draft.medicalsOrderByName.status = "SUCCESS_EMPTY";
      }
      draft.medicalsOrderByName.data = action.payload;
      delete draft.medicalsOrderByName.error;
      break;
    }

    case GET_MEDICAL_FAIL: {
      draft.medicalsOrderByName.status = "FAIL";
      draft.medicalsOrderByName.error = action.error;
      break;
    }
  }
}, initial);
