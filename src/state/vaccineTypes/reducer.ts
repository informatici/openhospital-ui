import produce from "immer";
import { VaccineTypeDTO } from "../../generated";
import { IAction } from "../types";
import {
  CREATE_VACCINE_TYPES_FAIL,
  CREATE_VACCINE_TYPES_LOADING,
  CREATE_VACCINE_TYPES_RESET,
  CREATE_VACCINE_TYPES_SUCCESS,
  DELETE_VACCINE_TYPES_FAIL,
  DELETE_VACCINE_TYPES_LOADING,
  DELETE_VACCINE_TYPES_RESET,
  DELETE_VACCINE_TYPES_SUCCESS,
  GET_VACCINE_TYPES_FAIL,
  GET_VACCINE_TYPES_LOADING,
  GET_VACCINE_TYPES_SUCCESS,
  GET_VACCINE_TYPES_SUCCESS_EMPTY,
  UPDATE_VACCINE_TYPES_FAIL,
  UPDATE_VACCINE_TYPES_LOADING,
  UPDATE_VACCINE_TYPES_RESET,
  UPDATE_VACCINE_TYPES_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IVaccineTypesState } from "./types";

export default produce(
  (draft: IVaccineTypesState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * Create vaccine type
       */
      case CREATE_VACCINE_TYPES_LOADING: {
        draft.create.status = "LOADING";
        draft.create.hasSucceeded = false;
        break;
      }

      case CREATE_VACCINE_TYPES_SUCCESS: {
        draft.create.status = "SUCCESS";
        draft.create.hasSucceeded = true;
        draft.create.data = action.payload;
        draft.getVaccineTypes.data = [
          ...(draft.getVaccineTypes.data ?? []),
          action.payload,
        ];
        delete draft.create.error;
        break;
      }

      case CREATE_VACCINE_TYPES_FAIL: {
        draft.create.status = "FAIL";
        draft.create.hasSucceeded = false;
        draft.create.error = action.error;
        break;
      }

      case CREATE_VACCINE_TYPES_RESET: {
        draft.create.status = "IDLE";
        draft.create.hasSucceeded = false;
        delete draft.create.error;
        break;
      }

      /**
       *  Get vaccine types
       */
      case GET_VACCINE_TYPES_LOADING: {
        draft.getVaccineTypes.status = "LOADING";
        draft.getVaccineTypes.hasSucceeded = false;
        break;
      }

      case GET_VACCINE_TYPES_SUCCESS: {
        draft.getVaccineTypes.status = "SUCCESS";
        draft.getVaccineTypes.data = action.payload;
        draft.getVaccineTypes.hasSucceeded = true;
        delete draft.getVaccineTypes.error;
        break;
      }

      case GET_VACCINE_TYPES_FAIL: {
        draft.getVaccineTypes.status = "FAIL";
        draft.getVaccineTypes.hasSucceeded = false;
        draft.getVaccineTypes.error = action.error;
        break;
      }

      case GET_VACCINE_TYPES_SUCCESS_EMPTY: {
        draft.getVaccineTypes.status = "SUCCESS_EMPTY";
        draft.getVaccineTypes.hasSucceeded = false;
        draft.getVaccineTypes.data = [];
        delete draft.getVaccineTypes.error;
        break;
      }

      /**
       * Update vaccine type
       */
      case UPDATE_VACCINE_TYPES_LOADING: {
        draft.update.status = "LOADING";
        draft.update.hasSucceeded = false;
        delete draft.update.error;
        break;
      }

      case UPDATE_VACCINE_TYPES_SUCCESS: {
        draft.update.status = "SUCCESS";
        draft.update.hasSucceeded = true;
        draft.update.data = action.payload;
        draft.getVaccineTypes.data = draft.getVaccineTypes.data?.map((e) => {
          return e.code === action.payload.code
            ? (action.payload as VaccineTypeDTO)
            : e;
        });
        delete draft.update.error;
        break;
      }

      case UPDATE_VACCINE_TYPES_FAIL: {
        draft.update.status = "FAIL";
        draft.update.hasSucceeded = false;
        draft.update.error = action.error;
        break;
      }

      case UPDATE_VACCINE_TYPES_RESET: {
        draft.update.status = "IDLE";
        draft.update.hasSucceeded = false;
        delete draft.update.error;
        break;
      }

      /**
       * Delete vaccine type
       */
      case DELETE_VACCINE_TYPES_LOADING: {
        draft.delete.status = "LOADING";
        draft.delete.hasSucceeded = false;
        delete draft.delete.error;
        break;
      }

      case DELETE_VACCINE_TYPES_SUCCESS: {
        draft.delete.status = "SUCCESS";
        draft.delete.hasSucceeded = true;
        draft.delete.data = action.payload;
        draft.getVaccineTypes.data = draft.getVaccineTypes.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
        delete draft.delete.error;
        break;
      }

      case DELETE_VACCINE_TYPES_FAIL: {
        draft.delete.status = "FAIL";
        draft.delete.hasSucceeded = false;
        draft.delete.error = action.error;
        break;
      }

      case DELETE_VACCINE_TYPES_RESET: {
        draft.delete.status = "IDLE";
        draft.delete.hasSucceeded = false;
        delete draft.delete.error;
        break;
      }
    }
  },
  initial
);
