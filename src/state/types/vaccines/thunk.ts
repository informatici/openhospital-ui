import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { VaccineTypeApi, type VaccineTypeDTO } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new VaccineTypeApi(customConfiguration());

export const getVaccineTypes = createAsyncThunk(
	'vaccineTypes/getVaccineTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getVaccineType())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createVaccineType = createAsyncThunk(
	'vaccineTypes/createVaccineType',
	async (vaccineTypeDTO: VaccineTypeDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newVaccineType({ vaccineTypeDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateVaccineType = createAsyncThunk(
	'vaccineTypes/updateVaccineType',
	async (vaccineTypeDTO: VaccineTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateVaccineType({ vaccineTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteVaccineType = createAsyncThunk(
	'vaccineTypes/deleteVaccineType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteVaccineType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
