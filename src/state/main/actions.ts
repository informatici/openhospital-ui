import { useHistory } from "react-router";
import { Dispatch } from "redux";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import { AUTH_KEY } from "../../consts";
import {
  Configuration,
  LoginApiApi,
  LoginResponse,
  UserControllerApi,
  UserProfileDTO,
} from "../../generated";
import { applyTokenMiddleware } from "../../libraries/apiUtils/applyTokenMiddleware";
import { saveAuthenticationDataToSession } from "../../libraries/authUtils/saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "../../libraries/authUtils/savePermissionDataToSession";
import { SessionStorage } from "../../libraries/storage/storage";
import { IAction } from "../types";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_LOADING,
  SET_LOGOUT_SUCCESS,
} from "./consts";
import { IAuthentication } from "./types";

const api = new LoginApiApi(new Configuration());
const usersApi = new UserControllerApi(
  new Configuration({ middleware: [applyTokenMiddleware] })
);

export const setAuthenticationSuccess = (
  payload: IAuthentication
): IAction<IAuthentication, {}> => ({
  type: SET_AUTHENTICATION_SUCCESS,
  payload,
});

export const setAuthenticationThunk =
  (username: string, password: string) =>
  (dispatch: Dispatch<IAction<LoginResponse, {}>>): void => {
    dispatch({
      type: SET_AUTHENTICATION_LOADING,
    });

    concat(
      api
        .loginUsingPOST({ password, username })
        .pipe(tap(saveAuthenticationDataToSession)),
      usersApi
        .retrieveProfileByCurrentLoggedInUserUsingGET()
        .pipe(tap(savePermissionDataToSession))
    )
      .pipe(toArray())
      .subscribe(
        ([userCredentials, me]) => {
          dispatch({
            type: SET_AUTHENTICATION_SUCCESS,
            payload: {
              ...(userCredentials as LoginResponse),
              permission: (me as UserProfileDTO).permission,
            },
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

export const setLogoutThunk =
  () =>
  (dispatch: Dispatch<IAction<void, {}>>): void => {
    dispatch({
      type: SET_LOGOUT_LOADING,
    });
    SessionStorage.clear();
    api.logoutUsingPOST().subscribe(
      () => {
        dispatch({
          type: SET_LOGOUT_SUCCESS,
        });
      },
      (error) => {
        dispatch({
          type: SET_LOGOUT_FAIL,
          error,
        });
      }
    );
  };
