import produce from "immer";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_ME_FAIL,
  SET_ME_LOADING,
  SET_ME_SUCCESS,
} from "./consts";
import { initial } from "./initial";
import { IMainState } from "./types";

export default produce((draft: IMainState, action: any) => {
  switch (action.type) {
    case SET_AUTHENTICATION_LOADING: {
      draft.authentication.status = "LOADING";
      break;
    }
    case SET_AUTHENTICATION_SUCCESS: {
      draft.authentication.status = "SUCCESS";
      draft.authentication.data = action.payload;
      break;
    }
    case SET_AUTHENTICATION_FAIL: {
      draft.authentication.status = "FAIL";
      draft.authentication.error = action.error;
      break;
    }

    case SET_ME_LOADING: {
      draft.me.status = "LOADING";
      break;
    }
    case SET_ME_SUCCESS: {
      draft.me.status = "SUCCESS";
      draft.me.data = action.payload;
      break;
    }
    case SET_ME_FAIL: {
      draft.me.status = "FAIL";
      draft.me.error = action.error;
      break;
    }
  }
}, initial);
