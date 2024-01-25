import produce from "immer";
import { IAction } from "../types";
import {
  CREATE_LAB_FAIL,
  CREATE_LAB_LOADING,
  CREATE_LAB_RESET,
  CREATE_LAB_SUCCESS,
  DELETE_LAB_FAIL,
  DELETE_LAB_LOADING,
  DELETE_LAB_RESET,
  DELETE_LAB_SUCCESS,
  GET_LABS_FAIL,
  GET_LABS_LOADING,
  GET_LABS_SUCCESS,
  GET_LABS_SUCCESS_EMPTY,
  GET_LABS_RESET,
  SEARCH_LAB_FAIL,
  SEARCH_LAB_RESET,
  SEARCH_LAB_SUCCESS,
  GET_MATERIALS_FAIL,
  GET_MATERIALS_LOADING,
  GET_MATERIALS_SUCCESS,
  UPDATE_LAB_FAIL,
  UPDATE_LAB_LOADING,
  UPDATE_LAB_RESET,
  UPDATE_LAB_SUCCESS,
  GET_LAB_FAIL,
  GET_LAB_LOADING,
  GET_LAB_RESET,
  GET_LAB_SUCCESS,
  GET_LABWROW_FAIL,
  GET_LABWROW_LOADING,
  GET_LABWROW_RESET,
  GET_LABWROW_SUCCESS,
  SEARCH_LAB_LOADING,
  CREATE_LAB_REQUEST_LOADING,
  CREATE_LAB_REQUEST_SUCCESS,
  CREATE_LAB_REQUEST_FAIL,
  CREATE_LAB_REQUEST_RESET,
  GET_LABS_REQUEST_LOADING,
  GET_LABS_REQUEST_SUCCESS,
  GET_LABS_REQUEST_SUCCESS_EMPTY,
  GET_LABS_REQUEST_FAIL,
  GET_LABS_REQUEST_RESET,
  CANCEL_LAB_LOADING,
  CANCEL_LAB_SUCCESS,
  CANCEL_LAB_FAIL,
  CANCEL_LAB_RESET,
} from "./consts";
import { initial } from "./initial";
import { ILaboratoriesState } from "./types";

export default produce(
  (draft: ILaboratoriesState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * CREATE_LAB
       */
      case CREATE_LAB_LOADING: {
        draft.createLab.status = "LOADING";
        break;
      }

      case CREATE_LAB_SUCCESS: {
        draft.createLab.status = "SUCCESS";
        draft.createLab.data = action.payload;
        draft.labsByPatientId.data = [
          ...(draft.labsByPatientId.data ?? []),
          action.payload,
        ];
        delete draft.createLab.error;
        break;
      }

      case CREATE_LAB_FAIL: {
        draft.createLab.status = "FAIL";
        draft.createLab.error = action.error;
        break;
      }

      case CREATE_LAB_RESET: {
        draft.createLab.status = "IDLE";
        delete draft.createLab.error;
        break;
      }

      /**
       * CREATE_LAB_REQUEST
       */
      case CREATE_LAB_REQUEST_LOADING: {
        draft.createLabRequest.status = "LOADING";
        break;
      }

      case CREATE_LAB_REQUEST_SUCCESS: {
        draft.createLabRequest.status = "SUCCESS";
        draft.createLabRequest.data = action.payload;
        delete draft.createLabRequest.error;
        break;
      }

      case CREATE_LAB_REQUEST_FAIL: {
        draft.createLabRequest.status = "FAIL";
        draft.createLabRequest.error = action.error;
        break;
      }

      case CREATE_LAB_REQUEST_RESET: {
        draft.createLabRequest.status = "IDLE";
        delete draft.createLabRequest.error;
        break;
      }

      /**
       * GET_LABS
       */
      case GET_LABS_LOADING: {
        draft.labsByPatientId.status = "LOADING";
        break;
      }

      case GET_LABS_SUCCESS: {
        draft.labsByPatientId.status = "SUCCESS";
        draft.labsByPatientId.data = action.payload;
        delete draft.labsByPatientId.error;
        break;
      }

      case GET_LABS_SUCCESS_EMPTY: {
        draft.labsByPatientId.status = "SUCCESS_EMPTY";
        draft.labsByPatientId.data = [];
        delete draft.labsByPatientId.error;
        break;
      }
      case GET_LABS_FAIL: {
        draft.labsByPatientId.status = "FAIL";
        draft.labsByPatientId.error = action.error;
        break;
      }

      case GET_LABS_RESET: {
        draft.labsByPatientId.status = "IDLE";
        delete draft.labsByPatientId.data;
        delete draft.labsByPatientId.error;
        break;
      }

      /**
       * GET_LABS_REQUEST_BY_PATIENT
       */
      case GET_LABS_REQUEST_LOADING: {
        draft.labsRequestByPatientId.status = "LOADING";
        break;
      }

      case GET_LABS_REQUEST_SUCCESS: {
        draft.labsRequestByPatientId.status = "SUCCESS";
        draft.labsRequestByPatientId.data = action.payload;
        delete draft.labsRequestByPatientId.error;
        break;
      }

      case GET_LABS_REQUEST_SUCCESS_EMPTY: {
        draft.labsRequestByPatientId.status = "SUCCESS_EMPTY";
        draft.labsRequestByPatientId.data = [];
        delete draft.labsRequestByPatientId.error;
        break;
      }
      case GET_LABS_REQUEST_FAIL: {
        draft.labsRequestByPatientId.status = "FAIL";
        draft.labsRequestByPatientId.error = action.error;
        break;
      }

      case GET_LABS_REQUEST_RESET: {
        draft.labsRequestByPatientId.status = "IDLE";
        delete draft.labsRequestByPatientId.data;
        delete draft.labsRequestByPatientId.error;
        break;
      }

      /**
       * GET_LAB
       */
      case GET_LAB_LOADING: {
        draft.getLabByCode.status = "LOADING";
        break;
      }

      case GET_LAB_SUCCESS: {
        draft.getLabByCode.status = "SUCCESS";
        draft.getLabByCode.data = action.payload;
        delete draft.getLabByCode.error;
        break;
      }

      case GET_LAB_FAIL: {
        draft.getLabByCode.status = "FAIL";
        draft.getLabByCode.error = action.error;
        break;
      }

      case GET_LAB_RESET: {
        draft.getLabByCode.status = "IDLE";
        delete draft.getLabByCode.error;
        break;
      }

      /**
       * GET_LABWROW
       */
      case GET_LABWROW_LOADING: {
        draft.getLabWithRowsByCode.status = "LOADING";
        break;
      }

      case GET_LABWROW_SUCCESS: {
        draft.getLabWithRowsByCode.status = "SUCCESS";
        draft.getLabWithRowsByCode.data = action.payload;
        delete draft.getLabWithRowsByCode.error;
        break;
      }

      case GET_LABWROW_FAIL: {
        draft.getLabWithRowsByCode.status = "FAIL";
        draft.getLabWithRowsByCode.error = action.error;
        break;
      }

      case GET_LABWROW_RESET: {
        draft.getLabWithRowsByCode.status = "IDLE";
        draft.getLabWithRowsByCode.data = null;
        delete draft.getLabWithRowsByCode.error;
        break;
      }

      /**
       * SEARCH_LAB
       */
      case SEARCH_LAB_SUCCESS: {
        draft.searchLabs.status = "SUCCESS";
        draft.searchLabs.data = action.payload;
        delete draft.searchLabs.error;
        break;
      }

      case SEARCH_LAB_FAIL: {
        draft.searchLabs.status = "FAIL";
        draft.searchLabs.error = action.error;
        break;
      }

      case SEARCH_LAB_RESET: {
        draft.searchLabs.status = "IDLE";
        delete draft.searchLabs.error;
        break;
      }

      case SEARCH_LAB_LOADING: {
        draft.searchLabs.status = "LOADING";
        break;
      }

      case UPDATE_LAB_LOADING: {
        draft.updateLab.status = "LOADING";
        break;
      }

      case UPDATE_LAB_SUCCESS: {
        draft.updateLab.status = "SUCCESS";
        draft.updateLab.data = action.payload;
        draft.labsByPatientId.data = draft.labsByPatientId.data?.map((e) => {
          return e.laboratoryDTO?.code === action.payload.laboratoryDTO?.code
            ? action.payload
            : e;
        });
        delete draft.updateLab.error;
        break;
      }

      case UPDATE_LAB_FAIL: {
        draft.updateLab.status = "FAIL";
        draft.updateLab.error = action.error;
        break;
      }

      case UPDATE_LAB_RESET: {
        draft.updateLab.status = "IDLE";
        delete draft.updateLab.error;
        break;
      }

      case DELETE_LAB_LOADING: {
        draft.deleteLab.status = "LOADING";
        break;
      }

      case DELETE_LAB_SUCCESS: {
        draft.deleteLab.status = "SUCCESS";
        delete draft.deleteLab.error;
        break;
      }

      case DELETE_LAB_FAIL: {
        draft.deleteLab.status = "FAIL";
        draft.deleteLab.error = action.error;
        break;
      }

      case DELETE_LAB_RESET: {
        draft.deleteLab.status = "IDLE";
        delete draft.deleteLab.error;
        break;
      }

      // Cancel lab exam
      case CANCEL_LAB_LOADING: {
        draft.cancelLab.status = "LOADING";
        break;
      }

      case CANCEL_LAB_SUCCESS: {
        draft.cancelLab.status = "SUCCESS";
        delete draft.cancelLab.error;
        break;
      }

      case CANCEL_LAB_FAIL: {
        draft.cancelLab.status = "FAIL";
        draft.cancelLab.error = action.error;
        break;
      }

      case CANCEL_LAB_RESET: {
        draft.cancelLab.status = "IDLE";
        delete draft.cancelLab.error;
        break;
      }

      // Get lab exams materials
      case GET_MATERIALS_LOADING: {
        draft.materials.status = "LOADING";
        break;
      }

      case GET_MATERIALS_SUCCESS: {
        draft.materials.status = "SUCCESS";
        draft.materials.data = action.payload;
        delete draft.materials.error;
        break;
      }
      case GET_MATERIALS_FAIL: {
        draft.materials.status = "FAIL";
        draft.materials.error = action.error;
        break;
      }
    }
  },
  initial
);
