import { Dispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginApi, UsersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { concat } from "rxjs";
import { tap, toArray } from "rxjs/operators";
import { saveAuthenticationDataToSession } from "../../libraries/authUtils/saveAuthenticationDataToSession";
import { savePermissionDataToSession } from "../../libraries/authUtils/savePermissionDataToSession";
import { SessionStorage } from "../../libraries/storage/storage";
import { IAction } from "../types";
import { setLogoutFailed, setLogoutLoading, setLogoutSuccess } from "./slice";
import { getPatientsReset, searchPatientsReset } from "../patients";
import { getLabsReset, searchLabsReset } from "../laboratories";
import { getOpdsReset } from "../opds";
import {
  getOperationsByAdmissionReset,
  getOperationsReset,
} from "../operations";

const loginApi = new LoginApi(customConfiguration(false));
const usersApi = new UsersApi(customConfiguration());

export const setAuthenticationThunk = createAsyncThunk(
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

export const setLogoutThunk =
  () =>
  (dispatch: Dispatch<IAction<void, {}>>): void => {
    dispatch(setLogoutLoading());
    SessionStorage.clear();
    loginApi.logout().subscribe(
      () => {
        dispatch(getPatientsReset());
        dispatch(getLabsReset());
        dispatch(searchLabsReset());
        dispatch(getOpdsReset());
        dispatch(searchPatientsReset());
        dispatch(getOperationsReset());
        dispatch(getOperationsByAdmissionReset());
        dispatch(setLogoutSuccess());
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
    usersApi
      .getUserSettings()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
