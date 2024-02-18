import produce from "immer";
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
  GET_CURRENTADMISSION_FAIL,
  GET_CURRENTADMISSION_LOADING,
  GET_CURRENTADMISSION_SUCCESS,
  DISCHARGE_PATIENT_LOADING,
  DISCHARGE_PATIENT_SUCCESS,
  DISCHARGE_PATIENT_FAIL,
  DISCHARGE_PATIENT_RESET,
  GET_CURRENTADMISSION_EMPTY,
  GET_CURRENTADMISSION_RESET,
  GET_ADMISSIONS_FAIL,
  GET_ADMISSIONS_LOADING,
  GET_ADMISSIONS_SUCCESS,
  GET_DISCHARGES_FAIL,
  GET_DISCHARGES_LOADING,
  GET_DISCHARGES_SUCCESS,
  GET_ADMITTED_PATIENTS_FAIL,
  GET_ADMITTED_PATIENTS_LOADING,
  GET_ADMITTED_PATIENTS_SUCCESS,
  GET_ADMITTED_PATIENTS_SUCCESS_EMPTY,
  GET_PATIENT_ADMISSIONS_FAIL,
  GET_PATIENT_ADMISSIONS_LOADING,
  GET_PATIENT_ADMISSIONS_SUCCESS,
  GET_PATIENT_ADMISSIONS_SUCCESS_EMPTY,
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
     * GET_ADMISSIONS
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

    case GET_ADMISSIONS_FAIL: {
      draft.getAdmissions.status = "FAIL";
      draft.getAdmissions.error = action.error;
      break;
    }

    /**
     * GET_PATIENT_ADMISSIONS
     */
    case GET_PATIENT_ADMISSIONS_LOADING: {
      draft.getPatientAdmissions.status = "LOADING";
      break;
    }

    case GET_PATIENT_ADMISSIONS_SUCCESS: {
      draft.getPatientAdmissions.status = "SUCCESS";
      draft.getPatientAdmissions.data = action.payload;
      delete draft.getPatientAdmissions.error;
      break;
    }

    case GET_PATIENT_ADMISSIONS_SUCCESS_EMPTY: {
      draft.getPatientAdmissions.status = "SUCCESS_EMPTY";
      draft.getPatientAdmissions.data = [];
      delete draft.getPatientAdmissions.error;
      break;
    }
    case GET_PATIENT_ADMISSIONS_FAIL: {
      draft.getPatientAdmissions.status = "FAIL";
      draft.getPatientAdmissions.error = action.error;
      break;
    }

    /**
     * GET_DISCHARGES
     */
    case GET_DISCHARGES_LOADING: {
      draft.getDischarges.status = "LOADING";
      break;
    }

    case GET_DISCHARGES_SUCCESS: {
      draft.getDischarges.status = "SUCCESS";
      draft.getDischarges.data = action.payload;
      delete draft.getDischarges.error;
      break;
    }
    case GET_DISCHARGES_FAIL: {
      draft.getDischarges.status = "FAIL";
      draft.getDischarges.error = action.error;
      break;
    }

    /**
     * GET_ADMITTED_PATIENTS
     */
    case GET_ADMITTED_PATIENTS_LOADING: {
      draft.getAdmittedPatients.status = "LOADING";
      break;
    }

    case GET_ADMITTED_PATIENTS_SUCCESS: {
      draft.getAdmittedPatients.status = "SUCCESS";
      draft.getAdmittedPatients.data = action.payload;
      delete draft.getAdmittedPatients.error;
      break;
    }

    case GET_ADMITTED_PATIENTS_SUCCESS_EMPTY: {
      draft.getAdmittedPatients.status = "SUCCESS_EMPTY";
      draft.getAdmittedPatients.data = [];
      delete draft.getAdmittedPatients.error;
      break;
    }
    case GET_ADMITTED_PATIENTS_FAIL: {
      draft.getAdmittedPatients.status = "FAIL";
      draft.getAdmittedPatients.error = action.error;
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
