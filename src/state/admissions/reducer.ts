import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_ADMISSION_FAIL,
  CREATE_ADMISSION_LOADING,
  CREATE_ADMISSION_RESET,
  CREATE_ADMISSION_SUCCESS,
  GET_ADMISSION_FAIL,
  GET_ADMISSION_LOADING,
  GET_ADMISSION_SUCCESS,
  GET_ADMISSION_SUCCESS_EMPTY,
} from "./consts";
import { initial } from "./initial";
import { IAdmissionsState } from "./types";

export default produce((draft: IAdmissionsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_ADMISSION
     */
    case CREATE_ADMISSION_LOADING: {
      draft.createAdmission.status = "LOADING";
      break;
    }

    case CREATE_ADMISSION_SUCCESS: {
      draft.createAdmission.status = "SUCCESS";
      draft.createAdmission.data = action.payload;
      delete draft.createAdmission.error;
      break;
    }

    case CREATE_ADMISSION_FAIL: {
      draft.createAdmission.status = "FAIL";
      draft.createAdmission.error = action.error;
      break;
    }

    case CREATE_ADMISSION_RESET: {
      draft.createAdmission.status = "IDLE";
      delete draft.createAdmission.error;
      break;
    }

    /**
     * GET_ADMISSION
     */
    case GET_ADMISSION_LOADING: {
      draft.admissionsByPatientId.status = "LOADING";
      break;
    }

    case GET_ADMISSION_SUCCESS: {
      draft.admissionsByPatientId.status = "SUCCESS";
      draft.admissionsByPatientId.data = action.payload;
      delete draft.admissionsByPatientId.error;
      break;
    }

    case GET_ADMISSION_SUCCESS_EMPTY: {
      draft.admissionsByPatientId.status = "SUCCESS_EMPTY";
      draft.admissionsByPatientId.data = [];
      delete draft.admissionsByPatientId.error;
      break;
    }
    case GET_ADMISSION_FAIL: {
      draft.admissionsByPatientId.status = "FAIL";
      draft.admissionsByPatientId.error = action.error;
      break;
    }
  }
}, initial);
