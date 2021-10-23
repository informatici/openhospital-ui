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
  GET_LAB_FAIL,
  GET_LAB_LOADING,
  GET_LAB_SUCCESS,
  GET_LAB_SUCCESS_EMPTY,
  GET_MATERIALS_FAIL,
  GET_MATERIALS_LOADING,
  GET_MATERIALS_SUCCESS,
  UPDATE_LAB_FAIL,
  UPDATE_LAB_LOADING,
  UPDATE_LAB_RESET,
  UPDATE_LAB_SUCCESS,
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
       * GET_LAB
       */
      case GET_LAB_LOADING: {
        draft.labsByPatientId.status = "LOADING";
        break;
      }

      case GET_LAB_SUCCESS: {
        draft.labsByPatientId.status = "SUCCESS";
        draft.labsByPatientId.data = action.payload;
        delete draft.labsByPatientId.error;
        break;
      }

      case GET_LAB_SUCCESS_EMPTY: {
        draft.labsByPatientId.status = "SUCCESS_EMPTY";
        draft.labsByPatientId.data = [];
        delete draft.labsByPatientId.error;
        break;
      }
      case GET_LAB_FAIL: {
        draft.labsByPatientId.status = "FAIL";
        draft.labsByPatientId.error = action.error;
        break;
      }

      case UPDATE_LAB_LOADING: {
        draft.updateLab.status = "LOADING";
        break;
      }

      case UPDATE_LAB_SUCCESS: {
        draft.updateLab.status = "SUCCESS";
        draft.updateLab.data = action.payload;
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
