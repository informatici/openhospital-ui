import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type MedicalTypeDTO, MedicalTypesApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new MedicalTypesApi(customConfiguration());

export const getMedicalTypes = createAsyncThunk(
	'medicalTypes/getMedicalTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getMedicalTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createMedicalType = createAsyncThunk(
	'medicalTypes/createMedicalType',
	async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.createMedicalType({ medicalTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateMedicalType = createAsyncThunk(
	'medicalTypes/updateMedicalType',
	async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateMedicalType({ medicalTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteMedicalType = createAsyncThunk(
	'medicalTypes/deleteMedicalType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteMedicalType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
