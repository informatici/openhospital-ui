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
        break;
      }

      case CREATE_VACCINE_TYPES_SUCCESS: {
        draft.create.status = "SUCCESS";
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
        draft.create.error = action.error;
        break;
      }

      case CREATE_VACCINE_TYPES_RESET: {
        draft.create.status = "IDLE";
        delete draft.create.error;
        break;
      }

      /**
       *  Get vaccine types
       */
      case GET_VACCINE_TYPES_LOADING: {
        draft.getVaccineTypes.status = "LOADING";
        break;
      }

      case GET_VACCINE_TYPES_SUCCESS: {
        draft.getVaccineTypes.status = "SUCCESS";
        draft.getVaccineTypes.data = action.payload;
        delete draft.getVaccineTypes.error;
        break;
      }

      case GET_VACCINE_TYPES_FAIL: {
        draft.getVaccineTypes.status = "FAIL";
        draft.getVaccineTypes.error = action.error;
        break;
      }

      case GET_VACCINE_TYPES_SUCCESS_EMPTY: {
        draft.getVaccineTypes.status = "SUCCESS_EMPTY";
        draft.getVaccineTypes.data = [];
        delete draft.getVaccineTypes.error;
        break;
      }

      /**
       * Update vaccine type
       */
      case UPDATE_VACCINE_TYPES_LOADING: {
        draft.update.status = "LOADING";
        delete draft.update.error;
        break;
      }

      case UPDATE_VACCINE_TYPES_SUCCESS: {
        draft.update.status = "SUCCESS";
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
        draft.update.error = action.error;
        break;
      }

      case UPDATE_VACCINE_TYPES_RESET: {
        draft.update.status = "IDLE";
        delete draft.update.error;
        break;
      }

      /**
       * Delete vaccine type
       */
      case DELETE_VACCINE_TYPES_LOADING: {
        draft.delete.status = "LOADING";
        delete draft.delete.error;
        break;
      }

      case DELETE_VACCINE_TYPES_SUCCESS: {
        draft.delete.status = "SUCCESS";
        draft.delete.data = action.payload.deleted;
        draft.getVaccineTypes.data = draft.getVaccineTypes.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
        delete draft.delete.error;
        break;
      }

      case DELETE_VACCINE_TYPES_FAIL: {
        draft.delete.status = "FAIL";
        draft.delete.error = action.error;
        break;
      }

      case DELETE_VACCINE_TYPES_RESET: {
        draft.delete.status = "IDLE";
        delete draft.delete.error;
        break;
      }
    }
  },
  initial
);
