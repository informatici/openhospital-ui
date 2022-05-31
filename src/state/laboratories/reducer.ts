import produce from "immer";
import { LaboratoryDTO } from "../../generated";
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
  SEARCH_LAB_SUCCESS_EMPTY,
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

      case SEARCH_LAB_SUCCESS_EMPTY: {
        draft.searchLabs.status = "SUCCESS_EMPTY";
        draft.searchLabs.data = [];
        delete draft.searchLabs.error;
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
          return e.code === action.payload.code
            ? (action.payload as LaboratoryDTO)
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
        draft.labsByPatientId.data = draft.labsByPatientId.data?.filter(
          (e) => e.code === action.payload.code
        );
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
