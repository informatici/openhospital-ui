import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import type { TValues } from '../../components/activities/searchPatientActivity/types';
import {
	type PatientDTO,
	PatientsApi,
	type UpdatePatientRequest,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new PatientsApi(customConfiguration());

export const searchPatient = createAsyncThunk(
	'patients/searchPatient',
	async (values: TValues, thunkApi) => {
		if (values.id) {
			return firstValueFrom(
				wrapper(() => api.getPatient({ code: parseInt(values.id, 10) })),
			)
				.then((result) => (result ? [result] : []))
				.catch((error) => thunkApi.rejectWithValue(error.response));
		}
		return firstValueFrom(
			wrapper(() =>
				api.searchPatient({
					...values,
					birthDate: moment(values.birthDate).isValid()
						? values.birthDate
						: undefined,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response));
	},
);

export const getCities = createAsyncThunk(
	'patients/getCities',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getPatientCities())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getPatients = createAsyncThunk(
	'patients/getPatients',
	async ({ page, size }: { page?: number; size?: number }, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getPatients({
					page: page ?? 0,
					size: size ?? 80,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getPatient = createAsyncThunk(
	'patients/getPatient',
	async (id: string, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getPatient({ code: parseInt(id, 10) })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createPatient = createAsyncThunk(
	'patients/createPatient',
	async (patientDTO: PatientDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newPatient({ patientDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updatePatient = createAsyncThunk(
	'patients/updatePatient',
	async (payload: UpdatePatientRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.updatePatient(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
