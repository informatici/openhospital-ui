import produce from "immer";
import { IAction } from "../types";
import {
  GET_MEDICALS_FAIL,
  GET_MEDICALS_LOADING,
  GET_MEDICALS_SUCCESS,
  GET_MEDICAL_FAIL,
  GET_MEDICAL_LOADING,
  GET_MEDICAL_SUCCESS,
  NEW_MEDICAL_FAIL,
  NEW_MEDICAL_LOADING,
  NEW_MEDICAL_RESET,
  NEW_MEDICAL_SUCCESS,
  EDIT_MEDICAL_LOADING,
  EDIT_MEDICAL_FAIL,
  EDIT_MEDICAL_RESET,
  EDIT_MEDICAL_SUCCESS,
  DELETE_MEDICAL_LOADING,
  DELETE_MEDICAL_FAIL,
  DELETE_MEDICAL_RESET,
  DELETE_MEDICAL_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IMedicalsState } from "./types";

export default produce((draft: IMedicalsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * NEW_MEDICAL
     */
    case NEW_MEDICAL_LOADING: {
      draft.newMedical.status = "LOADING";
      break;
    }

    case NEW_MEDICAL_SUCCESS: {
      draft.newMedical.status = "SUCCESS";
      delete draft.newMedical.error;
      break;
    }

    case NEW_MEDICAL_FAIL: {
      draft.newMedical.status = "FAIL";
      draft.newMedical.error = action.error;
      break;
    }

    case NEW_MEDICAL_RESET: {
      draft.newMedical.status = "IDLE";
      delete draft.newMedical.error;
      break;
    }

    /**
     * SEARCH_MEDICAL
     */
    case GET_MEDICALS_LOADING: {
      draft.getMedicals.status = "LOADING";
      break;
    }

    case GET_MEDICALS_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getMedicals.status = "SUCCESS";
      } else {
        draft.getMedicals.status = "SUCCESS_EMPTY";
      }
      draft.getMedicals.data = action.payload;
      delete draft.getMedicals.error;
      break;
    }

    case GET_MEDICALS_FAIL: {
      draft.getMedicals.status = "FAIL";
      draft.getMedicals.error = action.error;
      break;
    }

    /**
     * GET_MEDICAL
     */
    case GET_MEDICAL_LOADING: {
      draft.selectedMedical.status = "LOADING";
      break;
    }

    case GET_MEDICAL_SUCCESS: {
      draft.selectedMedical.status = "SUCCESS";
      draft.selectedMedical.data = action.payload;
      delete draft.selectedMedical.error;
      break;
    }

    case GET_MEDICAL_FAIL: {
      draft.selectedMedical.status = "FAIL";
      break;
    }

    /**
     * UPDATE_MEDICAL
     */
    case EDIT_MEDICAL_LOADING: {
      draft.editMedical.status = "LOADING";
      break;
    }

    case EDIT_MEDICAL_SUCCESS: {
      draft.editMedical.status = "SUCCESS";
      delete draft.editMedical.error;
      break;
    }

    case EDIT_MEDICAL_FAIL: {
      draft.editMedical.status = "FAIL";
      break;
    }

    case EDIT_MEDICAL_RESET: {
      draft.editMedical.status = "IDLE";
      delete draft.editMedical.error;
      break;
    }
  }
}, initial);
