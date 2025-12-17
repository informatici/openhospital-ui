import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	GetMedicalsSortByEnum,
	type MedicalDTO,
	MedicalsApi,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new MedicalsApi(customConfiguration());

export const getMedicals = createAsyncThunk(
	'medicals/getMedicals',
	async (_, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getMedicals({
					sortBy: GetMedicalsSortByEnum.Name,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createMedical = createAsyncThunk(
	'medicals/createMedical',
	async (medicalDTO: MedicalDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newMedical({ medicalDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateMedical = createAsyncThunk(
	'medicals/updateMedical',
	async (medicalDTO: MedicalDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateMedical({ medicalDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteMedical = createAsyncThunk(
	'medicals/deleteMedical',
	async (code: number, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteMedical({ code }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
