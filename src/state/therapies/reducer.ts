import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_THERAPY_FAIL,
  CREATE_THERAPY_LOADING,
  CREATE_THERAPY_RESET,
  CREATE_THERAPY_SUCCESS,
  SEARCH_THERAPY_FAIL,
  SEARCH_THERAPY_LOADING,
  SEARCH_THERAPY_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { ITherapiesState } from "./types";

export default produce((draft: ITherapiesState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_THERAPY
     */
    case CREATE_THERAPY_LOADING: {
      draft.createTherapy.status = "LOADING";
      break;
    }

    case CREATE_THERAPY_SUCCESS: {
      draft.createTherapy.status = "SUCCESS";
      draft.createTherapy.data = action.payload;
      delete draft.createTherapy.error;
      break;
    }

    case CREATE_THERAPY_FAIL: {
      draft.createTherapy.status = "FAIL";
      draft.createTherapy.error = action.error;
      break;
    }

    case CREATE_THERAPY_RESET: {
      draft.createTherapy.status = "IDLE";
      delete draft.createTherapy.error;
      break;
    }

    /**
     * SEARCH_THERAPY
     */
    case SEARCH_THERAPY_LOADING: {
      draft.therapiesByPatientId.status = "LOADING";
      break;
    }

    case SEARCH_THERAPY_SUCCESS: {
      if (action.payload.length > 0) {
        draft.therapiesByPatientId.status = "SUCCESS";
      } else {
        draft.therapiesByPatientId.status = "SUCCESS_EMPTY";
      }
      draft.therapiesByPatientId.data = action.payload;
      delete draft.therapiesByPatientId.error;
      break;
    }

    case SEARCH_THERAPY_FAIL: {
      draft.therapiesByPatientId.status = "FAIL";
      draft.therapiesByPatientId.error = action.error;
      break;
    }
  }
}, initial);
