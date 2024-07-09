import produce from "immer";
import { VaccineTypeDTO } from "../../../generated";
import { IAction } from "../../types";
import {
  CREATE_DISEASE_TYPES_FAIL,
  CREATE_DISEASE_TYPES_LOADING,
  CREATE_DISEASE_TYPES_RESET,
  CREATE_DISEASE_TYPES_SUCCESS,
  DELETE_DISEASE_TYPES_FAIL,
  DELETE_DISEASE_TYPES_LOADING,
  DELETE_DISEASE_TYPES_RESET,
  DELETE_DISEASE_TYPES_SUCCESS,
  GET_DISEASE_TYPES_FAIL,
  GET_DISEASE_TYPES_LOADING,
  GET_DISEASE_TYPES_SUCCESS,
  GET_DISEASE_TYPES_SUCCESS_EMPTY,
  UPDATE_DISEASE_TYPES_FAIL,
  UPDATE_DISEASE_TYPES_LOADING,
  UPDATE_DISEASE_TYPES_RESET,
  UPDATE_DISEASE_TYPES_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IDiseaseTypesState } from "./types";

export default produce(
  (draft: IDiseaseTypesState, action: IAction<any, any>) => {
    switch (action.type) {
      /**
       * Create disease type
       */
      case CREATE_DISEASE_TYPES_LOADING: {
        draft.create.status = "LOADING";
        break;
      }

      case CREATE_DISEASE_TYPES_SUCCESS: {
        draft.create.status = "SUCCESS";
        draft.create.data = action.payload;
        draft.getAll.data = [...(draft.getAll.data ?? []), action.payload];
        delete draft.create.error;
        break;
      }

      case CREATE_DISEASE_TYPES_FAIL: {
        draft.create.status = "FAIL";
        draft.create.error = action.error;
        break;
      }

      case CREATE_DISEASE_TYPES_RESET: {
        draft.create.status = "IDLE";
        delete draft.create.error;
        break;
      }

      /**
       *  Get disease types
       */
      case GET_DISEASE_TYPES_LOADING: {
        draft.getAll.status = "LOADING";
        break;
      }

      case GET_DISEASE_TYPES_SUCCESS: {
        draft.getAll.status = "SUCCESS";
        draft.getAll.data = action.payload;
        delete draft.getAll.error;
        break;
      }

      case GET_DISEASE_TYPES_FAIL: {
        draft.getAll.status = "FAIL";
        draft.getAll.error = action.error;
        break;
      }

      case GET_DISEASE_TYPES_SUCCESS_EMPTY: {
        draft.getAll.status = "SUCCESS_EMPTY";
        draft.getAll.data = [];
        delete draft.getAll.error;
        break;
      }

      /**
       * Update disease type
       */
      case UPDATE_DISEASE_TYPES_LOADING: {
        draft.update.status = "LOADING";
        delete draft.update.error;
        break;
      }

      case UPDATE_DISEASE_TYPES_SUCCESS: {
        draft.update.status = "SUCCESS";
        draft.update.data = action.payload;
        draft.getAll.data = draft.getAll.data?.map((e) => {
          return e.code === action.payload.code
            ? (action.payload as VaccineTypeDTO)
            : e;
        });
        delete draft.update.error;
        break;
      }

      case UPDATE_DISEASE_TYPES_FAIL: {
        draft.update.status = "FAIL";
        draft.update.error = action.error;
        break;
      }

      case UPDATE_DISEASE_TYPES_RESET: {
        draft.update.status = "IDLE";
        delete draft.update.error;
        break;
      }

      /**
       * Delete disease type
       */
      case DELETE_DISEASE_TYPES_LOADING: {
        draft.delete.status = "LOADING";
        delete draft.delete.error;
        break;
      }

      case DELETE_DISEASE_TYPES_SUCCESS: {
        draft.delete.status = "SUCCESS";
        draft.delete.data = action.payload.deleted;
        draft.getAll.data = draft.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
        delete draft.delete.error;
        break;
      }

      case DELETE_DISEASE_TYPES_FAIL: {
        draft.delete.status = "FAIL";
        draft.delete.error = action.error;
        break;
      }

      case DELETE_DISEASE_TYPES_RESET: {
        draft.delete.status = "IDLE";
        delete draft.delete.error;
        break;
      }
    }
  },
  initial
);
