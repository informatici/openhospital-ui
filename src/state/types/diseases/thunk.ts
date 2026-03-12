import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type DiseaseTypeDTO, DiseaseTypesApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new DiseaseTypesApi(customConfiguration());

export const getDiseaseTypes = createAsyncThunk(
	'diseaseTypes/getDiseaseTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getAllDiseaseTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createDiseaseType = createAsyncThunk(
	'diseaseTypes/createDiseaseType',
	async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newDiseaseType({ diseaseTypeDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateDiseaseType = createAsyncThunk(
	'diseaseTypes/updateDiseaseType',
	async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateDiseaseType({ diseaseTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteDiseaseType = createAsyncThunk(
	'diseaseTypes/deleteDiseaseType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteDiseaseType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
