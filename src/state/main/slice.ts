import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { IAuthentication } from "./types";
import { ApiResponse } from "state/types";

export const mainSlice = createSlice({
  name: "main",
  initialState: initial,
  reducers: {
    resetForgotPassword: (state) => {
      state.forgotpassword = initial.forgotpassword;
    },
    setAuthenticationSuccess: (
      state,
      { payload }: PayloadAction<IAuthentication>
    ) => {
      state.authentication.status = "SUCCESS";
      state.authentication.data = payload;
    },
    setLogoutReset: (state) => {
      state.logout.status = "IDLE";
    },
    setLogoutLoading: (state) => {
      state.logout.status = "LOADING";
    },
    setLogoutSuccess: (state) => {
      state.authentication = ApiResponse.idle();
      state.logout.status = "SUCCESS";
      state.settings = ApiResponse.idle();
    },
    setLogoutFailed: (state, { payload }: PayloadAction<any>) => {
      state.authentication = ApiResponse.idle();
      state.logout = ApiResponse.error(payload);
    },
  },
  extraReducers: (builder) =>
    builder
      // Authentication
      .addCase(thunks.setAuthentication.pending, (state) => {
        state.authentication.status = "LOADING";
      })
      .addCase(thunks.setAuthentication.fulfilled, (state, action) => {
        state.authentication.status = "SUCCESS";
        state.authentication.data = <IAuthentication>action.payload;
      })
      .addCase(thunks.setAuthentication.rejected, (state, action) => {
        state.authentication.status = "FAIL";
        state.authentication.error = action.payload;
      })
      // Forgot password
      .addCase(thunks.setForgotPasswordThunk.pending, (state) => {
        state.forgotpassword.status = "LOADING";
      })
      .addCase(thunks.setForgotPasswordThunk.fulfilled, (state, action) => {
        state.forgotpassword.status = "SUCCESS";
      })
      .addCase(thunks.setForgotPasswordThunk.rejected, (state, action) => {
        state.forgotpassword.status = "FAIL";
        state.forgotpassword.error = action.payload;
      })
      // Get User Settings
      .addCase(thunks.getUserSettings.pending, (state) => {
        state.settings.status = "LOADING";
      })
      .addCase(thunks.getUserSettings.fulfilled, (state, action) => {
        state.settings.status = "SUCCESS";
        state.settings.data = action.payload;
      })
      .addCase(thunks.getUserSettings.rejected, (state, action) => {
        state.settings.status = "FAIL";
        state.settings.error = action.payload;
      }),
});

export const {
  resetForgotPassword,
  setAuthenticationSuccess,
  setLogoutLoading,
  setLogoutSuccess,
  setLogoutFailed,
  setLogoutReset,
} = mainSlice.actions;
