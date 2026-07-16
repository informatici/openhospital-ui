import { createAsyncThunk, type Dispatch } from '@reduxjs/toolkit';
import { concat, firstValueFrom } from 'rxjs';
import { switchMap, tap, toArray } from 'rxjs/operators';
import {
	LoginApi,
	type UserGroupDTO,
	UserSettingsApi,
	UsersApi,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';
import { saveAuthenticationDataToSession } from '../../libraries/authUtils/saveAuthenticationDataToSession';
import { savePermissionDataToSession } from '../../libraries/authUtils/savePermissionDataToSession';
import { SessionStorage } from '../../libraries/storage/storage';
import { getLabsReset, searchLabsReset } from '../laboratories';
import { getOpdsReset } from '../opds';
import {
	getOperationsByAdmissionReset,
	getOperationsReset,
} from '../operations';
import { getPatientsReset, searchPatientsReset } from '../patients';
import type { IAction } from '../types';
import { setLogoutFailed, setLogoutLoading, setLogoutSuccess } from './slice';

const loginApi = new LoginApi(customConfiguration(false));
const usersApi = new UsersApi(customConfiguration());
const userSettingsApi = new UserSettingsApi(customConfiguration());

export const setAuthentication = createAsyncThunk(
	'main/getLayouts',
	async (payload: { username: string; password: string }, thunkApi) =>
		firstValueFrom(
			concat(
				loginApi
					.authenticateUser({ loginRequest: payload })
					.pipe(tap(saveAuthenticationDataToSession)),
				usersApi
					.retrieveProfileByCurrentLoggedInUser()
					.pipe(tap(savePermissionDataToSession)),
			).pipe(toArray()),
		)
			.then(([userCredentials, me]) => ({
				...userCredentials,
				...me,
			}))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const setLogout =
	() =>
	(dispatch: Dispatch<IAction<void, object>>): void => {
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
			},
		);
	};

export const changePassword = createAsyncThunk(
	'main/changePassword',
	async (payload: { password: string }, thunkApi) =>
		firstValueFrom(
			usersApi.retrieveProfileByCurrentLoggedInUser().pipe(
				switchMap((profile) =>
					usersApi.updateProfile({
						userDTO: {
							userName: profile.userName ?? '',
							userGroupName: profile.userGroup as UserGroupDTO,
							passwd: payload.password,
						},
					}),
				),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const setForgotPasswordThunk = createAsyncThunk(
	'main/setForgotPasswordThunk',
	async (_username: string, _thunkApi) => ({
		message: 'Password reset email sent',
	}),
);

export const getUserSettings = createAsyncThunk(
	'main/getUserSettings',
	async (_, thunkApi) =>
		firstValueFrom(userSettingsApi.getUserSettings()).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const refreshToken = createAsyncThunk(
	'main/refreshToken',
	async (value: string, thunkApi) =>
		firstValueFrom(
			concat(
				loginApi
					.refreshToken({ tokenRefreshRequest: { refreshToken: value } })
					.pipe(tap(saveAuthenticationDataToSession)),
				usersApi
					.retrieveProfileByCurrentLoggedInUser()
					.pipe(tap(savePermissionDataToSession)),
			).pipe(toArray()),
		)
			.then(([userCredentials, me]) => ({
				...userCredentials,
				...me,
			}))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
