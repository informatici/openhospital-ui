import { Dispatch } from "redux";
import { AUTH_TOKEN_KEY } from "../../consts";
import { Configuration, LoginApiApi, LoginResponse } from "../../generated";
import { SessionStorage } from "../../libraries/storage/storage";
import { IAction } from "../types";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
} from "./consts";

const api = new LoginApiApi(new Configuration());

export const setAuthentication = (username: string, password: string) => (
  dispatch: Dispatch<IAction<LoginResponse, {}>>
) => {
  dispatch({
    type: SET_AUTHENTICATION_LOADING,
  });

  api.loginUsingPOST({ password, username }).subscribe(
    (payload: LoginResponse) => {
      dispatch({
        type: SET_AUTHENTICATION_SUCCESS,
        payload: payload,
      });
      SessionStorage.write(AUTH_TOKEN_KEY, payload.token);
    },
    (error) => {
      dispatch({
        type: SET_AUTHENTICATION_FAIL,
        error,
      });
    }
  );
};
