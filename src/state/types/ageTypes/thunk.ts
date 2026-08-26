import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type AgeTypeDTO, AgeTypesApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new AgeTypesApi(customConfiguration());

export const getAgeTypes = createAsyncThunk(
	'ageTypes/getAll',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getAllAgeTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateAgeTypes = createAsyncThunk(
	'ageTypes/update',
	async (ageTypeDTO: AgeTypeDTO[], thunkApi) =>
		firstValueFrom(wrapper(() => api.updateAgeType({ ageTypeDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);
