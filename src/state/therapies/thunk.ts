import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { TherapiesApi, type TherapyRowDTO } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new TherapiesApi(customConfiguration());

export const getTherapiesByPatientId = createAsyncThunk(
	'therapies/getTherapiesByPatientId',
	async (codePatient: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getTherapyRows({ codePatient: codePatient ?? -1 })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createTherapy = createAsyncThunk(
	'therapies/createTherapy',
	async (therapyRowDTO: TherapyRowDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newTherapy({ therapyRowDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateTherapy = createAsyncThunk(
	'therapies/updateTherapy',
	async (therapyRowDTO: TherapyRowDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.replaceTherapies({ therapyRowDTO: [therapyRowDTO] })),
		)
			.then(() => therapyRowDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteTherapy = createAsyncThunk(
	'therapies/deleteTherapy',
	async (_code: number | undefined, thunkApi) =>
		thunkApi.rejectWithValue({
			message: 'Delete feature not yet available!!!',
		}),
);
