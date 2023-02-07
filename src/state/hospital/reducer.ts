import produce from "immer";
import { IAction } from "../types";
import {
  GET_HOSPITAL_FAIL,
  GET_HOSPITAL_LOADING,
  GET_HOSPITAL_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IHospitalState } from "./types";

export default produce((draft: IHospitalState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_HOSPITAL_LOADING: {
      draft.getHospital.status = "LOADING";
      break;
    }

    case GET_HOSPITAL_SUCCESS: {
      draft.getHospital.status = "SUCCESS";
      draft.getHospital.data = action.payload;
      delete draft.getHospital.error;
      break;
    }

    case GET_HOSPITAL_FAIL: {
      draft.getHospital.status = "FAIL";
      draft.getHospital.error = action.error;
      break;
    }
  }
}, initial);
