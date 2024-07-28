import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { UserGroupDTO } from "../../generated";
import { UsersApi } from "../../generated/apis/UsersApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import {
  GET_USERGROUP_FAIL,
  GET_USERGROUP_LOADING,
  GET_USERGROUP_SUCCESS,
  CREATE_USERGROUP_FAIL,
  CREATE_USERGROUP_LOADING,
  CREATE_USERGROUP_SUCCESS,
  CREATE_USERGROUP_RESET,
  UPDATE_USERGROUP_LOADING,
  UPDATE_USERGROUP_FAIL,
  UPDATE_USERGROUP_SUCCESS,
  UPDATE_USERGROUP_RESET,
  DELETE_USERGROUP_LOADING,
  DELETE_USERGROUP_FAIL,
  DELETE_USERGROUP_SUCCESS,
  DELETE_USERGROUP_RESET,
} from "./consts";

const usersApi = new UsersApi(customConfiguration());

export const getUserGroups =
  () =>
  (dispatch: Dispatch<IAction<UserGroupDTO[], {}>>): void => {
    dispatch({
      type: GET_USERGROUP_LOADING,
    });
    usersApi.getUserGroup().subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_USERGROUP_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_USERGROUP_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_USERGROUP_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createUserGroup =
  (userGroupDTO: UserGroupDTO) =>
  (dispatch: Dispatch<IAction<UserGroupDTO, {}>>): void => {
    dispatch({
      type: CREATE_USERGROUP_LOADING,
    });
    usersApi.newUserGroup({ userGroupDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_USERGROUP_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_USERGROUP_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createUserGroupReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_USERGROUP_RESET,
    });
  };

export const updateUserGroup =
  (userGroupDTO: UserGroupDTO) =>
  (dispatch: Dispatch<IAction<UserGroupDTO, {}>>): void => {
    dispatch({
      type: UPDATE_USERGROUP_LOADING,
    });
    usersApi.updateUserGroup({ userGroupDTO }).subscribe(
      (payload) => {
        dispatch({
          type: UPDATE_USERGROUP_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: UPDATE_USERGROUP_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const updateUserGroupReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: UPDATE_USERGROUP_RESET,
    });
  };

export const deleteUserGroup =
  (groupCode: string) =>
  (dispatch: Dispatch<IAction<boolean, {}>>): void => {
    dispatch({
      type: DELETE_USERGROUP_LOADING,
    });
    usersApi.deleteGroup({ groupCode }).subscribe(
      (payload) => {
        dispatch({
          type: DELETE_USERGROUP_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: DELETE_USERGROUP_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const deleteUserGroupReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: DELETE_USERGROUP_RESET,
    });
  };
