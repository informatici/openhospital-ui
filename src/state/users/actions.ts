import { isEmpty } from "lodash";
import { Dispatch } from "redux";
import { UserDTO } from "../../generated";
import { UsersApi, GetUserRequest } from "../../generated/apis/UsersApi";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { IAction } from "../types";
import { GET_USER_FAIL, GET_USER_LOADING, GET_USER_SUCCESS } from "./consts";

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
