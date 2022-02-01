import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_SURGICALRECORD_FAIL,
  CREATE_SURGICALRECORD_LOADING,
  CREATE_SURGICALRECORD_RESET,
  CREATE_SURGICALRECORD_SUCCESS,
  UPDATE_SURGICALRECORD_FAIL,
  UPDATE_SURGICALRECORD_LOADING,
  UPDATE_SURGICALRECORD_RESET,
  UPDATE_SURGICALRECORD_SUCCESS,
  GET_SURGICALRECORD_FAIL,
  GET_SURGICALRECORD_LOADING,
  GET_SURGICALRECORD_SUCCESS,
  GET_SURGICALRECORD_SUCCESS_EMPTY,
  GET_CURRENT_SURGICALRECORD_FAIL,
  GET_CURRENT_SURGICALRECORD_LOADING,
  GET_CURRENT_SURGICALRECORD_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { ISurgicalRecordsState } from "./types";

export default produce((draft: ISurgicalRecordsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_SURGICALRECORD
     */
    case CREATE_SURGICALRECORD_LOADING: {
      draft.createSurgicalRecord.status = "LOADING";
      break;
    }

    case CREATE_SURGICALRECORD_SUCCESS: {
      draft.createSurgicalRecord.status = "SUCCESS";
      draft.createSurgicalRecord.data = action.payload;
      delete draft.createSurgicalRecord.error;
      break;
    }

    case CREATE_SURGICALRECORD_FAIL: {
      draft.createSurgicalRecord.status = "FAIL";
      draft.createSurgicalRecord.error = action.error;
      break;
    }

    case CREATE_SURGICALRECORD_RESET: {
      draft.createSurgicalRecord.status = "IDLE";
      delete draft.createSurgicalRecord.error;
      break;
    }

    /**
     * UPDATE_SURGICALRECORD
     */
    case UPDATE_SURGICALRECORD_LOADING: {
      draft.updateSurgicalRecord.status = "LOADING";
      break;
    }

    case UPDATE_SURGICALRECORD_SUCCESS: {
      draft.updateSurgicalRecord.status = "SUCCESS";
      draft.updateSurgicalRecord.data = action.payload;
      delete draft.updateSurgicalRecord.error;
      break;
    }

    case UPDATE_SURGICALRECORD_FAIL: {
      draft.updateSurgicalRecord.status = "FAIL";
      draft.updateSurgicalRecord.error = action.error;
      break;
    }

    case UPDATE_SURGICALRECORD_RESET: {
      draft.updateSurgicalRecord.status = "IDLE";
      delete draft.updateSurgicalRecord.error;
      break;
    }

    /**
     * GET_SURGICALRECORD
     */
    case GET_SURGICALRECORD_LOADING: {
      draft.surgicalRecordsByPatientId.status = "LOADING";
      break;
    }

    case GET_SURGICALRECORD_SUCCESS: {
      draft.surgicalRecordsByPatientId.status = "SUCCESS";
      draft.surgicalRecordsByPatientId.data = action.payload;
      delete draft.surgicalRecordsByPatientId.error;
      break;
    }

    case GET_SURGICALRECORD_SUCCESS_EMPTY: {
      draft.surgicalRecordsByPatientId.status = "SUCCESS_EMPTY";
      draft.surgicalRecordsByPatientId.data = [];
      delete draft.surgicalRecordsByPatientId.error;
      break;
    }
    case GET_SURGICALRECORD_FAIL: {
      draft.surgicalRecordsByPatientId.status = "FAIL";
      draft.surgicalRecordsByPatientId.error = action.error;
      break;
    }

    /**
     * GET_CURRENT_SURGICALRECORD
     */
    case GET_CURRENT_SURGICALRECORD_LOADING: {
      draft.currentSurgicalRecordByPatientId.status = "LOADING";
      break;
    }

    case GET_CURRENT_SURGICALRECORD_SUCCESS: {
      draft.currentSurgicalRecordByPatientId.status = "SUCCESS";
      draft.currentSurgicalRecordByPatientId.data = action.payload;
      delete draft.currentSurgicalRecordByPatientId.error;
      break;
    }

    case GET_CURRENT_SURGICALRECORD_FAIL: {
      draft.currentSurgicalRecordByPatientId.status = "FAIL";
      draft.currentSurgicalRecordByPatientId.error = action.error;
      break;
    }
  }
}, initial);
