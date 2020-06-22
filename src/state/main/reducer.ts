import produce from "immer";
import {
  SET_TOKEN,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_AUTHENTICATION_FAIL,
} from "./consts";
import { IMainState } from "./types";
import { initial } from "./initial";

export default produce((draft: IMainState, action: any) => {
  switch (action.type) {
    case SET_TOKEN: {
      draft.token = action.payload;
      break;
    }
    case SET_AUTHENTICATION_LOADING: {
      draft.authentication.isLoading = true;
      break;
    }
    case SET_AUTHENTICATION_SUCCESS: {
      draft.authentication.data = action.payload;
      draft.authentication.isLoading = false;
      break;
    }
    case SET_AUTHENTICATION_FAIL: {
      draft.authentication.error = action.payload;
      draft.authentication.isLoading = false;
      break;
    }
  }
}, initial);
