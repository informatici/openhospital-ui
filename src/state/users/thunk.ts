import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type GetUserRequest, type UserDTO, UsersApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new UsersApi(customConfiguration());

export const getUsers = createAsyncThunk(
	'users/getUsers',
	async (payload: GetUserRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.getUser(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getUserById = createAsyncThunk(
	'users/getUserById',
	async (username: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.getUserByName({ username }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const createUser = createAsyncThunk(
	'users/createUser',
	async (userDTO: UserDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newUser({ userDTO })))
			.then(() => userDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (userDTO: UserDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateUser({ username: userDTO.userName, userDTO })),
		)
			.then(() => userDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (username: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteUser({ username }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
