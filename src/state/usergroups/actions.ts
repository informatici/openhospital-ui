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
  /*  CREATE_USERGROUP_FAIL,
  CREATE_USERGROUP_LOADING,
  CREATE_USERGROUP_SUCCESS,
  CREATE_USERGROUP_RESET,
  */
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

/*
export const createUserGroup =
  (userDTO: UserDTO) =>
  (dispatch: Dispatch<IAction<UserDTO, {}>>): void => {
    dispatch({
      type: CREATE_USERGROUP_LOADING,
    });
    usersApi.newUser({ userDTO }).subscribe(
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
*/
