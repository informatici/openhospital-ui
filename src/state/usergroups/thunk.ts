import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import type { UserGroupDTO } from '~/generated/models/UserGroupDTO';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { UserGroupsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new UserGroupsApi(customConfiguration());

export const getUserGroups = createAsyncThunk(
	'userGroups/getUserGroups',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getUserGroups())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createUserGroup = createAsyncThunk(
	'userGroups/createUserGroup',
	async (userGroupDTO: UserGroupDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newUserGroup({ userGroupDTO })))
			.then(() => userGroupDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateUserGroup = createAsyncThunk(
	'userGroups/updateUserGroup',
	async (userGroupDTO: UserGroupDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.updateUserGroup({ groupCode: userGroupDTO.code, userGroupDTO }),
			),
		)
			.then(() => userGroupDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteUserGroup = createAsyncThunk(
	'userGroups/deleteUserGroup',
	async (groupCode: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteGroup({ groupCode }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const getUserGroup = createAsyncThunk(
	'userGroups/getUserGroup',
	async (groupCode: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.getUserGroup({ groupCode }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const assignPermission = createAsyncThunk(
	'userGroups/setUserGroupPermission',
	async (
		{ permissionId, groupCode }: { permissionId: number; groupCode: string },
		thunkApi,
	) =>
		firstValueFrom(
			wrapper(() => api.assignPermission({ groupCode, id: permissionId })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const revokePermission = createAsyncThunk(
	'userGroups/setUserGroupPermission',
	async (
		{ permissionId, groupCode }: { permissionId: number; groupCode: string },
		thunkApi,
	) =>
		firstValueFrom(
			wrapper(() => api.revokePermission({ groupCode, id: permissionId })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);
