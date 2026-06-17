import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse } from '~/state/types';

import { initial } from './initial';
import * as thunks from './thunk';
import type { IAuthentication } from './types';

export const mainSlice = createSlice({
	name: 'main',
	initialState: initial,
	reducers: {
		resetForgotPassword: (state) => {
			state.forgotpassword = initial.forgotpassword;
		},
		setAuthenticationSuccess: (
			state,
			{ payload }: PayloadAction<IAuthentication>,
		) => {
			state.authentication = ApiResponse.value(payload);
		},
		clearMustChangePassword: (state) => {
			if (state.authentication.data) {
				state.authentication.data.mustChangePassword = false;
			}
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
				state.authentication = ApiResponse.value(
					action.payload as IAuthentication,
				);
			})
			.addCase(thunks.setAuthentication.rejected, (state, action) => {
				state.authentication = ApiResponse.error(action.payload);
			})
			// Refresh token
			.addCase(thunks.refreshToken.pending, (state) => {
				state.authentication = ApiResponse.loading();
			})
			.addCase(thunks.refreshToken.fulfilled, (state, action) => {
				state.authentication = ApiResponse.value(
					action.payload as IAuthentication,
				);
			})
			.addCase(thunks.refreshToken.rejected, (state, action) => {
				state.authentication = ApiResponse.error(action.payload);
			})
			// Forgot password
			.addCase(thunks.setForgotPasswordThunk.pending, (state) => {
				state.forgotpassword = ApiResponse.loading();
			})
			.addCase(thunks.setForgotPasswordThunk.fulfilled, (state, _action) => {
				state.forgotpassword.status = 'SUCCESS';
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
	clearMustChangePassword,
	setLogoutLoading,
	setLogoutSuccess,
	setLogoutFailed,
	setLogoutReset,
} = mainSlice.actions;
