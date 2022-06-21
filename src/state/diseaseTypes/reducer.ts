import produce from "immer";
import { IAction } from "../types";
import {
  GET_DISEASETYPE_FAIL,
  GET_DISEASETYPE_LOADING,
  GET_DISEASETYPE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IDiseaseTypeState } from "./types";

export default produce(
  (draft: IDiseaseTypeState, action: IAction<any, any>) => {
    switch (action.type) {
      case GET_DISEASETYPE_LOADING: {
        draft.getDiseaseTypes.status = "LOADING";
        break;
      }

      case GET_DISEASETYPE_SUCCESS: {
        draft.getDiseaseTypes.status = "SUCCESS";
        draft.getDiseaseTypes.data = action.payload;
        delete draft.getDiseaseTypes.error;
        break;
      }

      case GET_DISEASETYPE_FAIL: {
        draft.getDiseaseTypes.status = "FAIL";
        draft.getDiseaseTypes.error = action.error;
        break;
      }
    }
  },
  initial
);
