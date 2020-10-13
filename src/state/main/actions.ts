import { Dispatch } from "redux";
import { AUTH_KEY } from "../../consts";
import { Authentication, Configuration, LoginApiApi } from "../../generated";
import { allowCookies } from "../../libraries/apiUtils/allowCookies";
import { SessionStorage } from "../../libraries/storage/storage";
import { IAction } from "../types";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
} from "./consts";

const api = new LoginApiApi(new Configuration({ middleware: [allowCookies] }));

export const setAuthentication = (username: string, password: string) => (
  dispatch: Dispatch<IAction<Authentication, {}>>
) => {
  dispatch({
    type: SET_AUTHENTICATION_LOADING,
  });

  api.loginUsingPOST({ password, username }).subscribe(
    () => {
      dispatch({
        type: SET_AUTHENTICATION_SUCCESS,
      });
      SessionStorage.write(AUTH_KEY, "true");
    },
    (error) => {
      dispatch({
        type: SET_AUTHENTICATION_FAIL,
        error,
      });
    }
  );
};
