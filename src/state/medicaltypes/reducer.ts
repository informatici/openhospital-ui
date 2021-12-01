import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_MEDICALTYPE_FAIL,
  CREATE_MEDICALTYPE_LOADING,
  CREATE_MEDICALTYPE_SUCCESS,
  GET_MEDICALTYPE_SUCCESS,
  GET_MEDICALTYPE_LOADING,
  GET_MEDICALTYPE_FAIL,
  EDIT_MEDICALTYPE_FAIL,
  EDIT_MEDICALTYPE_LOADING,
  EDIT_MEDICALTYPE_SUCCESS,
  DELETE_MEDICALTYPE_LOADING,
  DELETE_MEDICALTYPE_SUCCESS,
  DELETE_MEDICALTYPE_FAIL,
} from "./consts";
import { initial } from "./initial";
import { IMedicalTypesState } from "./types";

export default produce((draft: IMedicalTypesState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * CREATE_MEDICALTYPE
     */
    case CREATE_MEDICALTYPE_LOADING: {
      draft.createMedicalType.status = "LOADING";
      break;
    }

    case CREATE_MEDICALTYPE_SUCCESS: {
      draft.createMedicalType.status = "SUCCESS";
      delete draft.createMedicalType.error;
      break;
    }

    case CREATE_MEDICALTYPE_FAIL: {
      draft.createMedicalType.status = "FAIL";
      draft.createMedicalType.error = action.error;
      break;
    }

    /**
     * GET_MEDICALTYPE
     */
    case GET_MEDICALTYPE_LOADING: {
      draft.getMedicalType.status = "LOADING";
      break;
    }

    case GET_MEDICALTYPE_SUCCESS: {
      draft.getMedicalType.status = "SUCCESS";
      draft.getMedicalType.data = action.payload;
      delete draft.getMedicalType.error;
      break;
    }

    case GET_MEDICALTYPE_FAIL: {
      draft.getMedicalType.status = "FAIL";
      break;
    }

    /**
     * EDIT_MEDICALTYPE
     */
    case EDIT_MEDICALTYPE_LOADING: {
      draft.editMedicalType.status = "LOADING";
      break;
    }

    case EDIT_MEDICALTYPE_SUCCESS: {
      draft.editMedicalType.status = "SUCCESS";
      delete draft.editMedicalType.error;
      break;
    }

    case EDIT_MEDICALTYPE_FAIL: {
      draft.editMedicalType.status = "FAIL";
      break;
    }

    /**
     * DELETE_MEDICALTYPE
     */
    case DELETE_MEDICALTYPE_LOADING: {
      draft.getMedicalType.status = "LOADING";
      break;
    }
  
    case DELETE_MEDICALTYPE_SUCCESS: {
      draft.deleteMedicalType.status = "SUCCESS";
      draft.deleteMedicalType.data = action.payload;
      delete draft.deleteMedicalType.error;
      break;
    }
  
    case DELETE_MEDICALTYPE_FAIL: {
      draft.deleteMedicalType.status = "FAIL";
      break;
    }
  }

}, initial);
