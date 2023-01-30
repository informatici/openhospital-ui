import produce from "immer";
import { AdmissionDTO } from "../../generated";
import { IAction } from "../types";
import {
  CREATE_ADMISSION_FAIL,
  CREATE_ADMISSION_LOADING,
  CREATE_ADMISSION_RESET,
  CREATE_ADMISSION_SUCCESS,
  UPDATE_ADMISSION_FAIL,
  UPDATE_ADMISSION_LOADING,
  UPDATE_ADMISSION_RESET,
  UPDATE_ADMISSION_SUCCESS,
  GET_ADMISSION_FAIL,
  GET_ADMISSION_LOADING,
  GET_ADMISSION_SUCCESS,
  GET_ADMISSION_SUCCESS_EMPTY,
  GET_CURRENTADMISSION_FAIL,
  GET_CURRENTADMISSION_LOADING,
  GET_CURRENTADMISSION_SUCCESS,
  DISCHARGE_PATIENT_LOADING,
  DISCHARGE_PATIENT_SUCCESS,
  DISCHARGE_PATIENT_FAIL,
  DISCHARGE_PATIENT_RESET,
  GET_CURRENTADMISSION_EMPTY,
  GET_CURRENTADMISSION_RESET,
  GET_ADMISSION_RESET,
  GET_ADMISSIONS_FAIL,
  GET_ADMISSIONS_LOADING,
  GET_ADMISSIONS_SUCCESS,
  GET_ONGOING_ADMISSIONS_FAIL,
  GET_ONGOING_ADMISSIONS_LOADING,
  GET_ONGOING_ADMISSIONS_SUCCESS,
  GET_ONGOING_ADMISSIONS_SUCCESS_EMPTY,
  GET_ADMISSIONS_SUCCESS_EMPTY,
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
      draft.getAdmissions.data = [
        ...(draft.getAdmissions.data ?? []),
        action.payload,
      ];
      draft.currentAdmissionByPatientId.data = action.payload;
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
     * DISCHARGE_PATIENT
     */
    case DISCHARGE_PATIENT_LOADING: {
      draft.dischargePatient.status = "LOADING";
      break;
    }

    case DISCHARGE_PATIENT_SUCCESS: {
      draft.dischargePatient.status = "SUCCESS";
      draft.dischargePatient.data = action.payload;
      draft.getAdmissions.data = draft.getAdmissions.data?.map((e) => {
        return e.id === action.payload?.id
          ? (action.payload as AdmissionDTO)
          : e;
      });
      draft.currentAdmissionByPatientId.data = undefined;
      delete draft.dischargePatient.error;
      break;
    }

    case DISCHARGE_PATIENT_FAIL: {
      draft.dischargePatient.status = "FAIL";
      draft.dischargePatient.error = action.error;
      break;
    }

    case DISCHARGE_PATIENT_RESET: {
      draft.dischargePatient.status = "IDLE";
      delete draft.dischargePatient.error;
      break;
    }

    /**
     * UPDATE_ADMISSION
     */
    case UPDATE_ADMISSION_LOADING: {
      draft.updateAdmission.status = "LOADING";
      break;
    }

    case UPDATE_ADMISSION_SUCCESS: {
      draft.updateAdmission.status = "SUCCESS";
      draft.updateAdmission.data = action.payload;
      draft.getAdmissions.data = draft.getAdmissions.data?.map((e) => {
        return e.id === action.payload?.id
          ? (action.payload as AdmissionDTO)
          : e;
      });
      if (draft.currentAdmissionByPatientId.data?.id === action.payload?.id) {
        draft.currentAdmissionByPatientId.data = action.payload;
      }
      delete draft.updateAdmission.error;
      break;
    }

    case UPDATE_ADMISSION_FAIL: {
      draft.updateAdmission.status = "FAIL";
      draft.updateAdmission.error = action.error;
      break;
    }

    case UPDATE_ADMISSION_RESET: {
      draft.updateAdmission.status = "IDLE";
      delete draft.updateAdmission.error;
      break;
    }

    /**
     * GET_ADMISSION
     */
    case GET_ADMISSIONS_LOADING: {
      draft.getAdmissions.status = "LOADING";
      break;
    }

    case GET_ADMISSIONS_SUCCESS: {
      draft.getAdmissions.status = "SUCCESS";
      draft.getAdmissions.data = action.payload;
      delete draft.getAdmissions.error;
      break;
    }

    case GET_ADMISSIONS_SUCCESS_EMPTY: {
      draft.getAdmissions.status = "SUCCESS_EMPTY";
      draft.getAdmissions.data = [];
      delete draft.getAdmissions.error;
      break;
    }
    case GET_ADMISSIONS_FAIL: {
      draft.getAdmissions.status = "FAIL";
      draft.getAdmissions.error = action.error;
      break;
    }

    /**
     * GET_ONGOING_ADMISSIONS
     */
    case GET_ONGOING_ADMISSIONS_LOADING: {
      draft.getOngoingAdmissions.status = "LOADING";
      break;
    }

    case GET_ONGOING_ADMISSIONS_SUCCESS: {
      draft.getOngoingAdmissions.status = "SUCCESS";
      draft.getOngoingAdmissions.data = action.payload;
      delete draft.getOngoingAdmissions.error;
      break;
    }

    case GET_ONGOING_ADMISSIONS_SUCCESS_EMPTY: {
      draft.getOngoingAdmissions.status = "SUCCESS_EMPTY";
      draft.getOngoingAdmissions.data = [];
      delete draft.getOngoingAdmissions.error;
      break;
    }
    case GET_ONGOING_ADMISSIONS_FAIL: {
      draft.getOngoingAdmissions.status = "FAIL";
      draft.getOngoingAdmissions.error = action.error;
      break;
    }

    /**
     * GET_CURRENTADMISSION
     */
    case GET_CURRENTADMISSION_LOADING: {
      draft.currentAdmissionByPatientId.status = "LOADING";
      break;
    }

    case GET_CURRENTADMISSION_SUCCESS: {
      draft.currentAdmissionByPatientId.status = "SUCCESS";
      draft.currentAdmissionByPatientId.data = action.payload;
      delete draft.currentAdmissionByPatientId.error;
      break;
    }

    case GET_CURRENTADMISSION_EMPTY: {
      draft.currentAdmissionByPatientId.status = "SUCCESS_EMPTY";
      draft.currentAdmissionByPatientId.data = action.payload;
      delete draft.currentAdmissionByPatientId.error;
      break;
    }

    case GET_CURRENTADMISSION_FAIL: {
      draft.currentAdmissionByPatientId.status = "FAIL";
      draft.currentAdmissionByPatientId.error = action.error;
      break;
    }
    case GET_CURRENTADMISSION_RESET: {
      draft.currentAdmissionByPatientId.status = "IDLE";
      delete draft.currentAdmissionByPatientId.data;
      delete draft.currentAdmissionByPatientId.error;
      break;
    }
  }
}, initial);
