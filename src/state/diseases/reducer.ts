import produce from "immer";
import { IAction } from "../types";
import {
  GET_DISEASE_FAIL,
  GET_DISEASE_LOADING,
  GET_DISEASE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IDiseaseState } from "./types";

export default produce((draft: IDiseaseState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_DISEASE_LOADING: {
      draft.getDiseases.status = "LOADING";
      break;
    }

    case GET_DISEASE_SUCCESS: {
      draft.getDiseases.status = "SUCCESS";
      draft.getDiseases.data = action.payload;
      delete draft.getDiseases.error;
      break;
    }

    case GET_DISEASE_FAIL: {
      draft.getDiseases.status = "FAIL";
      draft.getDiseases.error = action.error;
      break;
    }
  }
}, initial);
