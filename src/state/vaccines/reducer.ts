import produce from "immer";
import { IAction } from "../types";
import {
  GET_VACCINES_FAIL,
  GET_VACCINES_LOADING,
  GET_VACCINES_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IVaccineState } from "./types";

export default produce((draft: IVaccineState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_EXAMS
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
  }
}, initial);
