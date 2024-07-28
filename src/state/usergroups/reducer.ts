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
  UPDATE_USERGROUP_FAIL,
  UPDATE_USERGROUP_LOADING,
  UPDATE_USERGROUP_SUCCESS,
  UPDATE_USERGROUP_RESET,
  DELETE_USERGROUP_FAIL,
  DELETE_USERGROUP_LOADING,
  DELETE_USERGROUP_SUCCESS,
  DELETE_USERGROUP_RESET,
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

    /**
     * UPDATE_GROUP
     */

    case UPDATE_USERGROUP_LOADING: {
      draft.update.status = "LOADING";
      break;
    }

    case UPDATE_USERGROUP_SUCCESS: {
      draft.update.status = "SUCCESS";
      draft.update.data = action.payload;
      delete draft.update.error;
      break;
    }

    case UPDATE_USERGROUP_FAIL: {
      draft.update.status = "FAIL";
      draft.update.error = action.error;
      break;
    }

    case UPDATE_USERGROUP_RESET: {
      draft.update.status = "IDLE";
      delete draft.update.error;
      delete draft.update.data;
      break;
    }
    /**
     * DELETE_GROUP
     */

    case DELETE_USERGROUP_LOADING: {
      draft.delete.status = "LOADING";
      break;
    }

    case DELETE_USERGROUP_SUCCESS: {
      draft.delete.status = "SUCCESS";
      draft.delete.data = action.payload;
      delete draft.delete.error;
      break;
    }

    case DELETE_USERGROUP_FAIL: {
      draft.delete.status = "FAIL";
      draft.delete.error = action.error;
      break;
    }

    case DELETE_USERGROUP_RESET: {
      draft.delete.status = "IDLE";
      delete draft.delete.error;
      delete draft.delete.data;
      break;
    }
  }
}, initial);
