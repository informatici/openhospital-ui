import produce from "immer";
import { IAction } from "../types";
import { GET_WARD_FAIL, GET_WARD_LOADING, GET_WARD_SUCCESS } from "./consts";
import { initial } from "./initial";
import { IWardState } from "./types";

export default produce((draft: IWardState, action: IAction<any, any>) => {
  switch (action.type) {
    case GET_WARD_LOADING: {
      draft.allWards.status = "LOADING";
      break;
    }

    case GET_WARD_SUCCESS: {
      draft.allWards.status = "SUCCESS";
      draft.allWards.data = action.payload;
      delete draft.allWards.error;
      break;
    }

    case GET_WARD_FAIL: {
      draft.allWards.status = "FAIL";
      draft.allWards.error = action.error;
      break;
    }
  }
}, initial);
