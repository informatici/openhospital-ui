import produce from "immer";
import { IAction } from "../types";
import {
  GET_PRICE_SUCCESS,
  GET_PRICE_LOADING,
  GET_PRICE_FAIL,
  GET_PRICELISTS_LOADING,
  GET_PRICELISTS_SUCCESS,
  GET_PRICELISTS_FAIL,
} from "./consts";
import { initial } from "./initial";
import { IPricesState } from "./types";

export default produce((draft: IPricesState, action: IAction<any, any>) => {
  switch (action.type) {
    //GET PRICES

    case GET_PRICE_LOADING: {
      draft.getPrices.status = "LOADING";
      break;
    }

    case GET_PRICE_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getPrices.status = "SUCCESS";
      } else {
        draft.getPrices.status = "SUCCESS_EMPTY";
      }
      draft.getPrices.data = action.payload;
      delete draft.getPrices.error;
      break;
    }

    case GET_PRICE_FAIL: {
      draft.getPriceLists.status = "FAIL";
      draft.getPriceLists.error = action.error;
      break;
    }

    //GET PRICE LISTS
    case GET_PRICELISTS_LOADING: {
      draft.getPriceLists.status = "LOADING";
      break;
    }

    case GET_PRICELISTS_SUCCESS: {
      if (action.payload.length > 0) {
        draft.getPriceLists.status = "SUCCESS";
      } else {
        draft.getPriceLists.status = "SUCCESS_EMPTY";
      }
      draft.getPriceLists.data = action.payload;
      delete draft.getPriceLists.error;
      break;
    }

    case GET_PRICELISTS_FAIL: {
      draft.getPriceLists.status = "FAIL";
      draft.getPriceLists.error = action.error;
      break;
    }
  }
}, initial);
