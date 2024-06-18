import produce from "immer";
import { IAction } from "../types";
import {
  GET_VACCINES_FAIL,
  GET_VACCINES_LOADING,
  GET_VACCINES_SUCCESS,
  CREATE_VACCINE_FAIL,
  CREATE_VACCINE_LOADING,
  CREATE_VACCINE_RESET,
  CREATE_VACCINE_SUCCESS,
  DELETE_VACCINE_FAIL,
  DELETE_VACCINE_LOADING,
  DELETE_VACCINE_RESET,
  DELETE_VACCINE_SUCCESS,
  UPDATE_VACCINE_FAIL,
  UPDATE_VACCINE_LOADING,
  UPDATE_VACCINE_RESET,
  UPDATE_VACCINE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IVaccineState } from "./types";
import { VaccineDTO } from "../../generated";

export default produce((draft: IVaccineState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_VACCINES
     */
    case GET_VACCINES_LOADING: {
      draft.vaccineList.status = "LOADING";
      break;
    }

    case GET_VACCINES_SUCCESS: {
      draft.vaccineList.status = "SUCCESS";
      draft.vaccineList.data = action.payload;
      delete draft.vaccineList.error;
      break;
    }

    case GET_VACCINES_FAIL: {
      draft.vaccineList.status = "FAIL";
      draft.vaccineList.error = action.error;
      break;
    }

    /**
     * Create vaccine
     */
    case CREATE_VACCINE_LOADING: {
      draft.create.status = "LOADING";
      break;
    }

    case CREATE_VACCINE_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      draft.vaccineList.data = [
        ...(draft.vaccineList.data ?? []),
        action.payload,
      ];
      delete draft.create.error;
      break;
    }

    case CREATE_VACCINE_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      break;
    }

    case CREATE_VACCINE_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      break;
    }

    /**
     * Update vaccine
     */
    case UPDATE_VACCINE_LOADING: {
      draft.update.status = "LOADING";
      delete draft.update.error;
      break;
    }

    case UPDATE_VACCINE_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      draft.vaccineList.data = draft.vaccineList.data?.map((e) => {
        return e.code === action.payload.code
          ? (action.payload as VaccineDTO)
          : e;
      });
      delete draft.update.error;
      break;
    }

    case UPDATE_VACCINE_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      break;
    }

    case UPDATE_VACCINE_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      break;
    }

    /**
     * Delete vaccine
     */
    case DELETE_VACCINE_LOADING: {
      draft.delete.status = "LOADING";
      delete draft.delete.error;
      break;
    }

    case DELETE_VACCINE_SUCCESS: {
      draft.delete.status = "SUCCESS";
      draft.delete.data = action.payload.deleted;
      draft.vaccineList.data = draft.vaccineList.data?.filter((e) => {
        return e.code !== action.payload.code;
      });
      delete draft.delete.error;
      break;
    }

    case DELETE_VACCINE_FAIL: {
      draft.delete.status = "FAIL";
      draft.delete.error = action.error;
      break;
    }

    case DELETE_VACCINE_RESET: {
      draft.delete.status = "IDLE";
      delete draft.delete.error;
      break;
    }
  }
}, initial);
