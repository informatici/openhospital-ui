import {
  SET_TOKEN,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_AUTHENTICATION_FAIL,
} from "./consts";
import { Dispatch } from "redux";
import { Authentication, LoginApiApi } from "../../generated";
import { IAction } from "../types";

const api = new LoginApiApi();

export const setToken = (token: string): IAction<string, {}> => ({
  type: SET_TOKEN,
  payload: token,
});

export const setAuthentication = (username: string, password: string) => (
  dispatch: Dispatch<IAction<Authentication, {}>>
) => {
  dispatch({
    type: SET_AUTHENTICATION_LOADING,
  });

  api.loginUsingPOST({ password, username }).subscribe(
    (payload) => {
      dispatch({
        type: SET_AUTHENTICATION_SUCCESS,
        payload,
      });
    },
    (error) => {
      dispatch({
        type: SET_AUTHENTICATION_FAIL,
        error,
      });
    }
  );
};
