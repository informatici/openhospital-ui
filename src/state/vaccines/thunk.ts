import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type VaccineDTO, VaccinesApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new VaccinesApi(customConfiguration());

export const getVaccines = createAsyncThunk(
	'vaccines/getVaccines',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getVaccines())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createVaccine = createAsyncThunk(
	'vaccines/createVaccine',
	async (vaccineDTO: VaccineDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newVaccine({ vaccineDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateVaccine = createAsyncThunk(
	'vaccines/updateVaccine',
	async (vaccineDTO: VaccineDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateVaccine({ vaccineDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteVaccine = createAsyncThunk(
	'vaccines/deleteVaccine',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteVaccine({ code }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
