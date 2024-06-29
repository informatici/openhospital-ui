import produce from "immer";
import { IAction } from "../types";
import {
  GET_USER_FAIL,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  CREATE_USER_FAIL,
  CREATE_USER_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_RESET,
} from "./consts";
import { initial } from "./initial";
import { IUserState } from "./types";

export default produce((draft: IUserState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_USER
     */
    case GET_USER_LOADING: {
      draft.userList.status = "LOADING";
      break;
    }

    case GET_USER_SUCCESS: {
      draft.userList.status = "SUCCESS";
      draft.userList.data = action.payload;
      delete draft.userList.error;
      break;
    }

    case GET_USER_FAIL: {
      draft.userList.status = "FAIL";
      draft.userList.error = action.error;
      break;
    }

    /**
     * CREATE_USER
     */

    case CREATE_USER_LOADING: {
      draft.create.status = "LOADING";
      break;
    }

    case CREATE_USER_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      delete draft.create.error;
      break;
    }

    case CREATE_USER_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      break;
    }

    case CREATE_USER_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      delete draft.create.data;
      break;
    }
  }
}, initial);
