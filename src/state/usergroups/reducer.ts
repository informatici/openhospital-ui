import produce from "immer";
import { IAction } from "../types";
import {
  GET_USERGROUP_FAIL,
  GET_USERGROUP_LOADING,
  GET_USERGROUP_SUCCESS,
  CREATE_USERGROUP_FAIL,
  CREATE_USERGROUP_LOADING,
  CREATE_USERGROUP_SUCCESS,
  CREATE_USERGROUP_RESET,
} from "./consts";
import { initial } from "./initial";
import { IUserGroupState } from "./types";

export default produce((draft: IUserGroupState, action: IAction<any, any>) => {
  switch (action.type) {
    /**
     * GET_GROUP
     */
    case GET_USERGROUP_LOADING: {
      draft.groupList.status = "LOADING";
      break;
    }

    case GET_USERGROUP_SUCCESS: {
      draft.groupList.status = "SUCCESS";
      draft.groupList.data = action.payload;
      delete draft.groupList.error;
      break;
    }

    case GET_USERGROUP_FAIL: {
      draft.groupList.status = "FAIL";
      draft.groupList.error = action.error;
      break;
    }

    /**
     * CREATE_GROUP
     */

    case CREATE_USERGROUP_LOADING: {
      draft.create.status = "LOADING";
      break;
    }

    case CREATE_USERGROUP_SUCCESS: {
      draft.create.status = "SUCCESS";
      draft.create.data = action.payload;
      delete draft.create.error;
      break;
    }

    case CREATE_USERGROUP_FAIL: {
      draft.create.status = "FAIL";
      draft.create.error = action.error;
      break;
    }

    case CREATE_USERGROUP_RESET: {
      draft.create.status = "IDLE";
      delete draft.create.error;
      delete draft.create.data;
      break;
    }
  }
}, initial);
