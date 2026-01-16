import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	type PregnantTreatmentTypeDTO,
	PregnantTreatmentTypesApi,
} from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new PregnantTreatmentTypesApi(customConfiguration());

export const getPregnantTreatmentTypes = createAsyncThunk(
	'pregnantTreatmentTypes/getPregnantTreatmentTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getPregnantTreatmentTypes())).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const createPregnantTreatmentType = createAsyncThunk(
	'pregnantTreatmentTypes/createPregnantTreatmentType',
	async (pregnantTreatmentTypeDTO: PregnantTreatmentTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newPregnantTreatmentType({ pregnantTreatmentTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updatePregnantTreatmentType = createAsyncThunk(
	'pregnantTreatmentTypes/updatePregnantTreatmentType',
	async (
		payload: {
			code: string;
			pregnantTreatmentTypeDTO: PregnantTreatmentTypeDTO;
		},
		thunkApi,
	) =>
		firstValueFrom(
			wrapper(() => api.updatePregnantTreatmentTypes(payload)),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deletePregnantTreatmentType = createAsyncThunk(
	'pregnantTreatmentTypes/deletePregnantTreatmentType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deletePregnantTreatmentType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
