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
      draft.diseasesAll.status = "LOADING";
      break;
    }

    case GET_DISEASE_SUCCESS: {
      draft.diseasesAll.status = "SUCCESS";
      draft.diseasesAll.data = action.payload;
      delete draft.diseasesAll.error;
      break;
    }

    case GET_DISEASE_FAIL: {
      draft.diseasesAll.status = "FAIL";
      draft.diseasesAll.error = action.error;
      break;
    }
  }
}, initial);
