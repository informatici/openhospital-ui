import produce from "immer";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_FORGOT_PASSWORD_LOADING,
  SET_FORGOT_PASSWORD_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_LOADING,
  SET_LOGOUT_SUCCESS,
  RESET_FORGOT_PASSWORD,
  GET_USER_SETTINGS_SUCCESS,
  GET_USER_SETTINGS_LOADING,
  GET_USER_SETTINGS_FAIL,
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
    case SET_LOGOUT_FAIL: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.logout.status = "FAIL";
      draft.logout.error = action.error;
      break;
    }
    case SET_LOGOUT_SUCCESS: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.logout.status = "SUCCESS";
      draft.settings.status = "IDLE";
      draft.settings.data = undefined;
      draft.settings.error = undefined;
      break;
    }
    case SET_LOGOUT_LOADING: {
      draft.logout.status = "LOADING";
      break;
    }
    case SET_FORGOT_PASSWORD_LOADING: {
      draft.forgotpassword.status = "LOADING";
      break;
    }
    case SET_FORGOT_PASSWORD_SUCCESS: {
      draft.forgotpassword.status = "SUCCESS";
      break;
    }
    case RESET_FORGOT_PASSWORD: {
      draft.authentication.status = "IDLE";
      draft.authentication.data = undefined;
      draft.forgotpassword.status = "IDLE";
      break;
    }
    case GET_USER_SETTINGS_LOADING: {
      draft.settings.status = "LOADING";
      break;
    }
    case GET_USER_SETTINGS_SUCCESS: {
      draft.settings.status = "SUCCESS";
      draft.settings.data = action.payload;
      break;
    }
    case GET_USER_SETTINGS_FAIL: {
      draft.settings.status = "FAIL";
      draft.settings.error = action.error;
      draft.settings.data = undefined;
      break;
    }
  }
}, initial);
