import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type DiseaseDTO, DiseasesApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new DiseasesApi(customConfiguration());

export const getAllDiseases = createAsyncThunk(
	'diseases/getAllDiseases',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getAllDiseases())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getDiseasesOpd = createAsyncThunk(
	'diseases/getDiseasesOpd',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDiseasesOpd())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getDiseasesIpdIn = createAsyncThunk(
	'diseases/getDiseasesIpdIn',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDiseasesIpdIn())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getDiseasesIpdOut = createAsyncThunk(
	'diseases/getDiseasesIpdOut',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDiseasesIpdOut())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createDisease = createAsyncThunk(
	'diseases/createDisease',
	async (diseaseDTO: DiseaseDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newDisease({ diseaseDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateDisease = createAsyncThunk(
	'diseases/updateDisease',
	async (diseaseDTO: DiseaseDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateDisease({ diseaseDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);
