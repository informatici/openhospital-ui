import produce from "immer";
import { IPatientsState } from "./types";
import { initial } from "./initial";
import {
  GET_PATIENT_SUCCESS,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_SUCCESS,
  CREATE_PATIENT_FAIL,
  GET_PATIENT_LOADING,
  GET_PATIENT_FAIL,
  SEARCH_PATIENT_LOADING,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_FAIL,
  CREATE_PATIENT_RESET,
} from "./consts";
import { IAction } from "../types";

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
      delete draft.createPatient.error;
      break;
    }

    /**
     * SEARCH_PATIENT
     */
    case SEARCH_PATIENT_LOADING: {
      draft.searchResults.isLoading = true;
      break;
    }

    case SEARCH_PATIENT_SUCCESS: {
      draft.searchResults.isLoading = false;
      draft.searchResults.data = action.payload;
      delete draft.searchResults.error;
      break;
    }

    case SEARCH_PATIENT_FAIL: {
      draft.searchResults.isLoading = false;
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
