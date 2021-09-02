import produce from "immer";
import { IAction } from "../types";
import {
  GET_DISEASEIPDIN_FAIL,
  GET_DISEASEIPDIN_LOADING,
  GET_DISEASEIPDIN_SUCCESS,
  GET_DISEASEIPDOUT_FAIL,
  GET_DISEASEIPDOUT_LOADING,
  GET_DISEASEIPDOUT_SUCCESS,
  GET_DISEASE_FAIL,
  GET_DISEASE_LOADING,
  GET_DISEASE_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IDiseaseState } from "./types";

export default produce((draft: IDiseaseState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_DISEASE_LOADING: {
      draft.diseasesOpd.status = "LOADING";
      break;
    }

    case GET_DISEASE_SUCCESS: {
      draft.diseasesOpd.status = "SUCCESS";
      draft.diseasesOpd.data = action.payload;
      delete draft.diseasesOpd.error;
      break;
    }

    case GET_DISEASE_FAIL: {
      draft.diseasesOpd.status = "FAIL";
      draft.diseasesOpd.error = action.error;
      break;
    }

    /**
     * get diseases IPD IN
     */
    case GET_DISEASEIPDIN_LOADING: {
      draft.diseasesIpdIn.status = "LOADING";
      break;
    }

    case GET_DISEASEIPDIN_SUCCESS: {
      draft.diseasesIpdIn.status = "SUCCESS";
      draft.diseasesIpdIn.data = action.payload;
      delete draft.diseasesIpdIn.error;
      break;
    }

    case GET_DISEASEIPDIN_FAIL: {
      draft.diseasesIpdIn.status = "FAIL";
      draft.diseasesIpdIn.error = action.error;
      break;
    }

    case GET_DISEASEIPDOUT_LOADING: {
      draft.diseasesOpd.status = "LOADING";
      break;
    }

    case GET_DISEASEIPDOUT_SUCCESS: {
      draft.diseasesIpdOut.status = "SUCCESS";
      draft.diseasesIpdOut.data = action.payload;
      delete draft.diseasesIpdOut.error;
      break;
    }

    case GET_DISEASEIPDOUT_FAIL: {
      draft.diseasesIpdOut.status = "FAIL";
      draft.diseasesIpdOut.error = action.error;
      break;
    }
  }
}, initial);
