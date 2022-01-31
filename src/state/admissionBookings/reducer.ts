import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_ADMISSIONBOOKING_FAIL,
  CREATE_ADMISSIONBOOKING_LOADING,
  CREATE_ADMISSIONBOOKING_RESET,
  CREATE_ADMISSIONBOOKING_SUCCESS,
  UPDATE_ADMISSIONBOOKING_FAIL,
  UPDATE_ADMISSIONBOOKING_LOADING,
  UPDATE_ADMISSIONBOOKING_RESET,
  UPDATE_ADMISSIONBOOKING_SUCCESS,
  GET_ADMISSIONBOOKING_FAIL,
  GET_ADMISSIONBOOKING_LOADING,
  GET_ADMISSIONBOOKING_SUCCESS,
  GET_ADMISSIONBOOKING_SUCCESS_EMPTY,
  GET_CURRENT_ADMISSIONBOOKING_FAIL,
  GET_CURRENT_ADMISSIONBOOKING_LOADING,
  GET_CURRENT_ADMISSIONBOOKING_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IAdmissionBookingsState } from "./types";

export default produce((draft: IAdmissionBookingsState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_ADMISSIONBOOKING
     */
    case CREATE_ADMISSIONBOOKING_LOADING: {
      draft.createAdmissionBooking.status = "LOADING";
      break;
    }

    case CREATE_ADMISSIONBOOKING_SUCCESS: {
      draft.createAdmissionBooking.status = "SUCCESS";
      draft.createAdmissionBooking.data = action.payload;
      delete draft.createAdmissionBooking.error;
      break;
    }

    case CREATE_ADMISSIONBOOKING_FAIL: {
      draft.createAdmissionBooking.status = "FAIL";
      draft.createAdmissionBooking.error = action.error;
      break;
    }

    case CREATE_ADMISSIONBOOKING_RESET: {
      draft.createAdmissionBooking.status = "IDLE";
      delete draft.createAdmissionBooking.error;
      break;
    }

    /**
     * UPDATE_ADMISSIONBOOKING
     */
    case UPDATE_ADMISSIONBOOKING_LOADING: {
      draft.updateAdmissionBooking.status = "LOADING";
      break;
    }

    case UPDATE_ADMISSIONBOOKING_SUCCESS: {
      draft.updateAdmissionBooking.status = "SUCCESS";
      draft.updateAdmissionBooking.data = action.payload;
      delete draft.updateAdmissionBooking.error;
      break;
    }

    case UPDATE_ADMISSIONBOOKING_FAIL: {
      draft.updateAdmissionBooking.status = "FAIL";
      draft.updateAdmissionBooking.error = action.error;
      break;
    }

    case UPDATE_ADMISSIONBOOKING_RESET: {
      draft.updateAdmissionBooking.status = "IDLE";
      delete draft.updateAdmissionBooking.error;
      break;
    }

    /**
     * GET_ADMISSIONBOOKING
     */
    case GET_ADMISSIONBOOKING_LOADING: {
      draft.admissionBookingsByPatientId.status = "LOADING";
      break;
    }

    case GET_ADMISSIONBOOKING_SUCCESS: {
      draft.admissionBookingsByPatientId.status = "SUCCESS";
      draft.admissionBookingsByPatientId.data = action.payload;
      delete draft.admissionBookingsByPatientId.error;
      break;
    }

    case GET_ADMISSIONBOOKING_SUCCESS_EMPTY: {
      draft.admissionBookingsByPatientId.status = "SUCCESS_EMPTY";
      draft.admissionBookingsByPatientId.data = [];
      delete draft.admissionBookingsByPatientId.error;
      break;
    }
    case GET_ADMISSIONBOOKING_FAIL: {
      draft.admissionBookingsByPatientId.status = "FAIL";
      draft.admissionBookingsByPatientId.error = action.error;
      break;
    }

    /**
     * GET_CURRENT_ADMISSIONBOOKING
     */
    case GET_CURRENT_ADMISSIONBOOKING_LOADING: {
      draft.currentAdmissionBookingByPatientId.status = "LOADING";
      break;
    }

    case GET_CURRENT_ADMISSIONBOOKING_SUCCESS: {
      draft.currentAdmissionBookingByPatientId.status = "SUCCESS";
      draft.currentAdmissionBookingByPatientId.data = action.payload;
      delete draft.currentAdmissionBookingByPatientId.error;
      break;
    }

    case GET_CURRENT_ADMISSIONBOOKING_FAIL: {
      draft.currentAdmissionBookingByPatientId.status = "FAIL";
      draft.currentAdmissionBookingByPatientId.error = action.error;
      break;
    }
  }
}, initial);
