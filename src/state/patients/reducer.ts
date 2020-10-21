import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_RESET,
  CREATE_PATIENT_SUCCESS,
  GET_PATIENT_FAIL,
  GET_PATIENT_LOADING,
  GET_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IPatientsState } from "./types";

export default produce((draft: IPatientsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_PATIENT
     */
    case CREATE_PATIENT_LOADING: {
      draft.createPatient.status = "LOADING";
      break;
    }

    case CREATE_PATIENT_SUCCESS: {
      draft.createPatient.status = "SUCCESS";
      delete draft.createPatient.error;
      break;
    }

    case CREATE_PATIENT_FAIL: {
      draft.createPatient.status = "FAIL";
      draft.createPatient.error = action.error;
      break;
    }

    case CREATE_PATIENT_RESET: {
      draft.createPatient.status = "IDLE";
      delete draft.createPatient.error;
      break;
    }

    /**
     * SEARCH_PATIENT
     */
    case SEARCH_PATIENT_LOADING: {
      draft.searchResults.status = "LOADING";
      break;
    }

    case SEARCH_PATIENT_SUCCESS: {
      if (action.payload.length > 0) {
        draft.searchResults.status = "SUCCESS";
      } else {
        draft.searchResults.status = "SUCCESS_EMPTY";
      }
      draft.searchResults.data = action.payload;
      delete draft.searchResults.error;
      break;
    }

    case SEARCH_PATIENT_FAIL: {
      draft.searchResults.status = "FAIL";
      draft.searchResults.error = action.error;
      break;
    }

    /**
     * GET_PATIENT
     */
    case GET_PATIENT_LOADING: {
      draft.selectedPatient.isLoading = true;
      break;
    }

    case GET_PATIENT_SUCCESS: {
      draft.selectedPatient.isLoading = false;
      draft.selectedPatient.data = action.payload;
      delete draft.selectedPatient.error;
      break;
    }

    case GET_PATIENT_FAIL: {
      draft.selectedPatient.isLoading = false;
      break;
    }
  }
}, initial);
