import produce from "immer";
import { TherapyRowDTO } from "../../generated";
import { IAction } from "../types";
import {
  CREATE_THERAPY_FAIL,
  CREATE_THERAPY_LOADING,
  CREATE_THERAPY_RESET,
  CREATE_THERAPY_SUCCESS,
  DELETE_THERAPY_FAIL,
  DELETE_THERAPY_LOADING,
  DELETE_THERAPY_RESET,
  DELETE_THERAPY_SUCCESS,
  GET_THERAPY_FAIL,
  GET_THERAPY_LOADING,
  GET_THERAPY_SUCCESS,
  GET_THERAPY_SUCCESS_EMPTY,
  UPDATE_THERAPY_FAIL,
  UPDATE_THERAPY_LOADING,
  UPDATE_THERAPY_RESET,
  UPDATE_THERAPY_SUCCESS,
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
      if (draft.therapiesByPatientId.data) {
        draft.therapiesByPatientId.data = [
          ...draft.therapiesByPatientId.data,
          action.payload,
        ];
      } else {
        draft.therapiesByPatientId.data = [action.payload];
      }
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
    case GET_THERAPY_LOADING: {
      draft.therapiesByPatientId.status = "LOADING";
      break;
    }

    case GET_THERAPY_SUCCESS: {
      draft.therapiesByPatientId.status = "SUCCESS";
      draft.therapiesByPatientId.data = action.payload;
      delete draft.therapiesByPatientId.error;
      break;
    }

    case GET_THERAPY_SUCCESS_EMPTY: {
      draft.therapiesByPatientId.status = "SUCCESS_EMPTY";
      draft.therapiesByPatientId.data = [];
      delete draft.therapiesByPatientId.error;
      break;
    }
    case GET_THERAPY_FAIL: {
      draft.therapiesByPatientId.status = "FAIL";
      draft.therapiesByPatientId.error = action.error;
      break;
    }

    /**
     * DELETE THERAPY
     */
    case DELETE_THERAPY_LOADING: {
      draft.deleteTherapy.status = "LOADING";
      break;
    }
    case DELETE_THERAPY_SUCCESS: {
      draft.deleteTherapy.status = "SUCCESS";
      delete draft.deleteTherapy.error;
      break;
    }
    case DELETE_THERAPY_FAIL: {
      draft.deleteTherapy.status = "FAIL";
      draft.deleteTherapy.error = action.error;
      break;
    }
    case DELETE_THERAPY_RESET: {
      draft.deleteTherapy.status = "IDLE";
      delete draft.deleteTherapy.error;
      break;
    }
    case UPDATE_THERAPY_LOADING: {
      draft.updateTherapy.status = "LOADING";
      break;
    }

    case UPDATE_THERAPY_SUCCESS: {
      draft.updateTherapy.status = "SUCCESS";
      draft.updateTherapy.data = action.payload;
      draft.therapiesByPatientId.data = draft.therapiesByPatientId.data?.map(
        (e) => {
          return e.therapyID === action.payload.therapyID
            ? (action.payload as TherapyRowDTO)
            : e;
        }
      );
      delete draft.updateTherapy.error;
      break;
    }

    case UPDATE_THERAPY_FAIL: {
      draft.updateTherapy.status = "FAIL";
      draft.updateTherapy.error = action.error;
      break;
    }

    case UPDATE_THERAPY_RESET: {
      draft.updateTherapy.status = "IDLE";
      delete draft.updateTherapy.error;
      break;
    }
  }
}, initial);
