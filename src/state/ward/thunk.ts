import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type WardDTO, WardsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new WardsApi(customConfiguration());

export const getWards = createAsyncThunk(
	'wards/getWards',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getWards())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createWard = createAsyncThunk(
	'wards/createWard',
	async (wardDTO: WardDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newWard({ wardDTO }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateWard = createAsyncThunk(
	'wards/updateWard',
	async (wardDTO: WardDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateWard({ wardDTO }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const deleteWard = createAsyncThunk(
	'wards/deleteWard',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteWard({ code }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
