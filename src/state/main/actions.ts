import { Dispatch } from "redux";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import {
  LoginControllerApi,
  LoginRequest,
  LoginResponse,
  UserControllerApi,
  UserProfileDTO,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
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

const api = new LoginControllerApi(customConfiguration(false));
const usersApi = new UserControllerApi(customConfiguration());

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

    const loginRequest: LoginRequest = {
      username: username,
      password: password,
    };

    concat(
      api
        .authenticationUserUsingPOST({ loginRequest })
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
              permission: (me as UserProfileDTO)?.permission,
            },
          });
        },
        (error) => {
          dispatch({
            type: SET_AUTHENTICATION_FAIL,
            error: error?.response,
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
          error: error?.response,
        });
      }
    );
  };
