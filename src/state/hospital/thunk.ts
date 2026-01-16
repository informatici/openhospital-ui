import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type HospitalDTO, HospitalsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new HospitalsApi(customConfiguration(false));

const securedApi = new HospitalsApi(customConfiguration());

export const getHospital = createAsyncThunk(
	'hospitals/getHospital',
	async (_, thunkApi) =>
		firstValueFrom(api.getHospital()).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateHospital = createAsyncThunk(
	'hospitals/updateHospital',
	async (payload: { code: string; hospitalDTO: HospitalDTO }, thunkApi) =>
		firstValueFrom(wrapper(() => securedApi.updateHospital(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);
