import { Dispatch } from "redux";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import {
  LoginApiApi,
  LoginControllerApi,
  LoginRequest,
  UserControllerApi,
  UserProfileDTO,
} from "../../generated";
import { LoginResponse } from "../../generated/models/LoginResponse";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { saveAuthenticationDataToSession } from "../../libraries/authUtils/saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "../../libraries/authUtils/savePermissionDataToSession";
import { SessionStorage } from "../../libraries/storage/storage";
import { GET_LABS_RESET, SEARCH_LAB_RESET } from "../laboratories/consts";
import { GET_OPD_RESET } from "../opds/consts";
import {
  GET_OPERATIONROW_ADM_RESET,
  GET_OPERATIONS_RESET,
} from "../operations/consts";
import { GET_PATIENT_RESET, SEARCH_PATIENT_RESET } from "../patients/consts";
import { IAction } from "../types";
import {
  SET_AUTHENTICATION_FAIL,
  SET_AUTHENTICATION_LOADING,
  SET_AUTHENTICATION_SUCCESS,
  SET_LOGOUT_FAIL,
  SET_LOGOUT_LOADING,
  SET_LOGOUT_SUCCESS,
  SET_FORGOT_PASSWORD_LOADING,
  SET_FORGOT_PASSWORD_SUCCESS,
  RESET_FORGOT_PASSWORD,
} from "./consts";
import { IAuthentication } from "./types";

const api = new LoginControllerApi(customConfiguration(false));
const loginApi = new LoginApiApi(customConfiguration(false));
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

    const loginRequest: LoginRequest = { username, password };

    concat(
      api
        .authenticateUserUsingPOST({ loginRequest })
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
              ...(me as UserProfileDTO),
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
    loginApi.logoutUsingPOST().subscribe(
      () => {
        dispatch({
          type: GET_PATIENT_RESET,
        });
        dispatch({
          type: GET_LABS_RESET,
        });
        dispatch({
          type: SEARCH_LAB_RESET,
        });
        dispatch({
          type: GET_OPD_RESET,
        });
        dispatch({
          type: GET_PATIENT_RESET,
        });
        dispatch({
          type: SEARCH_PATIENT_RESET,
        });
        dispatch({
          type: GET_OPERATIONS_RESET,
        });
        dispatch({
          type: GET_OPERATIONROW_ADM_RESET,
        });
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

// as those aren't yet available on the api, I mock them here
// they should be generated by the api generator
type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

export const setForgotPasswordThunk =
  (username: string) =>
  (dispatch: Dispatch<IAction<ForgotPasswordResponse, {}>>): void => {
    dispatch({
      type: SET_FORGOT_PASSWORD_LOADING,
    });

    console.log("username", username);
    // const loginRequest: ForgotPasswordRequest = {
    //   username,
    // };

    window.setTimeout(() => {
      dispatch({
        type: SET_FORGOT_PASSWORD_SUCCESS,
        payload: {
          message: "Password reset email sent",
        } as ForgotPasswordResponse,
      });
    }, 500);
  };

export const resetForgotPasswordThunk =
  () =>
  (dispatch: Dispatch<IAction<ForgotPasswordResponse, {}>>): void => {
    dispatch({
      type: RESET_FORGOT_PASSWORD,
    });
  };
