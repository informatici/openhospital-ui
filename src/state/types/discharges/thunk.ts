import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import type { DischargeTypeDTO } from '~/generated/models/DischargeTypeDTO';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { DischargeTypeApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new DischargeTypeApi(customConfiguration());

export const getDischargeTypes = createAsyncThunk(
	'dischargeTypes/getDischargeTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDischargeTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createDischargeType = createAsyncThunk(
	'dischargeTypes/createDischargeType',
	async (dischargeTypeDTO: DischargeTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newDischargeType({ dischargeTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateDischargeType = createAsyncThunk(
	'dischargeTypes/updateDischargeType',
	async (dischargeTypeDTO: DischargeTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateDischargeType({ dischargeTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteDischargeType = createAsyncThunk(
	'dischargeTypes/deleteDischargeType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteDischargeType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
