import { createSelector } from 'reselect';
import type { IState } from '~/types';

export const selectMainState = (state: IState) => state.main;

export const selectAuthenticationState = createSelector(
	[selectMainState],
	(mainState) => mainState.authentication,
);

export const selectAuthenticationLoading = createSelector(
	[selectAuthenticationState],
	(state) => state.isLoading,
);

export const selectAuthenticationError = createSelector(
	[selectAuthenticationState],
	(state) => state.error,
);

export const selectAuthentication = createSelector(
	[selectAuthenticationState],
	(state) => state.data,
);

export const selectLogoutState = createSelector(
	[selectMainState],
	(mainState) => mainState.logout,
);

export const selectLogoutLoading = createSelector(
	[selectLogoutState],
	(state) => state.isLoading,
);

export const selectLogoutError = createSelector(
	[selectLogoutState],
	(state) => state.error,
);

export const selectForgotpasswordState = createSelector(
	[selectMainState],
	(mainState) => mainState.forgotpassword,
);

export const selectForgotpasswordLoading = createSelector(
	[selectForgotpasswordState],
	(state) => state.isLoading,
);

export const selectForgotpasswordError = createSelector(
	[selectForgotpasswordState],
	(state) => state.error,
);

export const selectSettingsState = createSelector(
	[selectMainState],
	(mainState) => mainState.settings,
);

export const selectSettingsLoading = createSelector(
	[selectSettingsState],
	(state) => state.isLoading,
);

export const selectSettingsError = createSelector(
	[selectSettingsState],
	(state) => state.error,
);

export const selectSettings = createSelector(
	[selectSettingsState],
	(state) => state.data,
);
