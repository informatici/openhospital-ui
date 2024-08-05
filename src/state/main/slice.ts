import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { IAuthentication } from "./types";

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
      state.authentication = ApiResponse.value(payload);
    },
    setLogoutReset: (state) => {
      state.logout = initial.logout;
    },
    setLogoutLoading: (state) => {
      state.logout = ApiResponse.loading();
    },
    setLogoutSuccess: (state, action) => {
      state.authentication = ApiResponse.idle();
      state.logout = ApiResponse.value(action.payload);
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
        state.authentication = ApiResponse.loading();
      })
      .addCase(thunks.setAuthentication.fulfilled, (state, action) => {
        state.authentication = ApiResponse.value(<IAuthentication>action.payload);
      })
      .addCase(thunks.setAuthentication.rejected, (state, action) => {
        state.authentication = ApiResponse.error(action.payload);
      })
      // Forgot password
      .addCase(thunks.setForgotPasswordThunk.pending, (state) => {
        state.forgotpassword = ApiResponse.loading();
      })
      .addCase(thunks.setForgotPasswordThunk.fulfilled, (state, action) => {
        state.forgotpassword.status = "SUCCESS";
      })
      .addCase(thunks.setForgotPasswordThunk.rejected, (state, action) => {
        state.forgotpassword = ApiResponse.error(action.payload);
      })
      // Get User Settings
      .addCase(thunks.getUserSettings.pending, (state) => {
        state.settings = ApiResponse.loading();
      })
      .addCase(thunks.getUserSettings.fulfilled, (state, action) => {
        state.settings = ApiResponse.value(action.payload);
      })
      .addCase(thunks.getUserSettings.rejected, (state, action) => {
        state.settings = ApiResponse.error(action.payload);
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
