import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { UserDTO } from "../../generated";
import { UsersApi, GetUserRequest } from "../../generated/apis/UsersApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
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

const usersApi = new UsersApi(customConfiguration());

export const getUsers =
  ({ groupId }: GetUserRequest) =>
  (dispatch: Dispatch<IAction<UserDTO[], {}>>): void => {
    dispatch({
      type: GET_USER_LOADING,
    });
    usersApi.getUser({ groupId }).subscribe(
      (payload) => {
        if (typeof payload === "object" && !isEmpty(payload)) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: payload,
          });
        } else {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: [],
          });
        }
      },
      (error) => {
        dispatch({
          type: GET_USER_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createUser =
  (userDTO: UserDTO) =>
  (dispatch: Dispatch<IAction<UserDTO, {}>>): void => {
    dispatch({
      type: CREATE_USER_LOADING,
    });
    usersApi.newUser({ userDTO }).subscribe(
      (payload) => {
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: payload,
        });
      },
      (error) => {
        dispatch({
          type: CREATE_USER_FAIL,
          error: error?.response,
        });
      }
    );
  };

export const createUserReset =
  () =>
  (dispatch: Dispatch<IAction<null, {}>>): void => {
    dispatch({
      type: CREATE_USER_RESET,
    });
  };
