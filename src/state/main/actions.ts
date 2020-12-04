import { Dispatch } from "redux";
import { AUTH_KEY } from "../../consts";
import { Configuration, LoginApiApi, LoginResponse } from "../../generated";
import { SessionStorage } from "../../libraries/storage/storage";
import { IAction } from "../types";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
} from "./consts";

const api = new LoginApiApi(new Configuration());

export const setAuthenticationSuccess = (
  userCredentials: LoginResponse
): IAction<LoginResponse, {}> => ({
  type: SET_AUTHENTICATION_SUCCESS,
  payload: userCredentials,
});

export const setAuthenticationThunk = (username: string, password: string) => (
  dispatch: Dispatch<IAction<LoginResponse, {}>>
): void => {
  dispatch({
    type: SET_AUTHENTICATION_LOADING,
  });

  api.loginUsingPOST({ password, username }).subscribe(
    (payload: LoginResponse) => {
      dispatch(setAuthenticationSuccess(payload));
      SessionStorage.write(AUTH_KEY, payload);
    },
    (error) => {
      dispatch({
        type: SET_AUTHENTICATION_FAIL,
        error,
      });
    }
  );
};
