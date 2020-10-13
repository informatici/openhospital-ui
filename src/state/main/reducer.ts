import produce from "immer";
import {
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_AUTHENTICATION_FAIL,
} from "./consts";
import { IMainState } from "./types";
import { initial } from "./initial";

export default produce((draft: IMainState, action: any) => {
  switch (action.type) {
    case SET_AUTHENTICATION_LOADING: {
      draft.authentication.isLoading = true;
      break;
    }
    case SET_AUTHENTICATION_SUCCESS: {
      draft.authentication.isLoading = false;
      draft.authentication.hasSucceeded = true;
      break;
    }
    case SET_AUTHENTICATION_FAIL: {
      draft.authentication.error = action.error;
      draft.authentication.isLoading = false;
      break;
    }
  }
}, initial);
