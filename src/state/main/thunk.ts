import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import { LoginApi, UsersApi, UserSettingsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { saveAuthenticationDataToSession } from "../../libraries/authUtils/saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "../../libraries/authUtils/savePermissionDataToSession";
import { SessionStorage } from "../../libraries/storage/storage";
import { getLabsReset, searchLabsReset } from "../laboratories";
import { getOpdsReset } from "../opds";
import {
  getOperationsByAdmissionReset,
  getOperationsReset,
} from "../operations";
import { getPatientsReset, searchPatientsReset } from "../patients";
import { IAction } from "../types";
import { setLogoutFailed, setLogoutLoading, setLogoutSuccess } from "./slice";

const loginApi = new LoginApi(customConfiguration(false));
const usersApi = new UsersApi(customConfiguration());
const userSettingsApi = new UserSettingsApi(customConfiguration());

export const setAuthentication = createAsyncThunk(
  "main/getLayouts",
  async (payload: { username: string; password: string }, thunkApi) =>
    concat(
      loginApi
        .authenticateUser({ loginRequest: payload })
        .pipe(tap(saveAuthenticationDataToSession)),
      usersApi
        .retrieveProfileByCurrentLoggedInUser()
        .pipe(tap(savePermissionDataToSession))
    )
      .pipe(toArray())
      .toPromise()
      .then(([userCredentials, me]) => ({
        ...userCredentials,
        ...me,
      }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const setLogout =
  () =>
  (dispatch: Dispatch<IAction<void, {}>>): void => {
    dispatch(setLogoutLoading());
    SessionStorage.clear();
    loginApi.logout().subscribe(
      (payload) => {
        dispatch(getPatientsReset());
        dispatch(getLabsReset());
        dispatch(searchLabsReset());
        dispatch(getOpdsReset());
        dispatch(searchPatientsReset());
        dispatch(getOperationsReset());
        dispatch(getOperationsByAdmissionReset());
        dispatch(setLogoutSuccess(payload));
      },
      (error) => {
        dispatch(setLogoutFailed(error?.response));
      }
    );
  };

export const setForgotPasswordThunk = createAsyncThunk(
  "main/setForgotPasswordThunk",
  async (username: string, thunkApi) => ({
    message: "Password reset email sent",
  })
);

export const getUserSettings = createAsyncThunk(
  "main/getUserSettings",
  async (_, thunkApi) =>
    userSettingsApi
      .getUserSettings()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
