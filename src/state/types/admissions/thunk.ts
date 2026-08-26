import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type AdmissionTypeDTO, AdmissionTypesApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new AdmissionTypesApi(customConfiguration());

export const getAdmissionTypes = createAsyncThunk(
	'admissionTypes/getAdmissionTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getAdmissionTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createAdmissionType = createAsyncThunk(
	'admissionTypes/createAdmissionType',
	async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newAdmissionType({ admissionTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateAdmissionType = createAsyncThunk(
	'admissionTypes/updateAdmissionType',
	async (admissionTypeDTO: AdmissionTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateAdmissionTypes({ admissionTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteAdmissionType = createAsyncThunk(
	'admissionTypes/deleteAdmissionType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteAdmissionType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
