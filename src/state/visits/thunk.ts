import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	type UpdateVisitRequest,
	VisitApi,
	type VisitDTO,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new VisitApi(customConfiguration());

export const getVisits = createAsyncThunk(
	'visits/getVisits',
	async (patientCode: number, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getVisit({
					patID: patientCode,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createVisit = createAsyncThunk(
	'visits/createVisit',
	async (visitDTO: VisitDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newVisit({ visitDTO }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateVisit = createAsyncThunk(
	'visits/updateVisit',
	async (payload: UpdateVisitRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateVisit(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const deleteVisit = createAsyncThunk(
	'visits/deleteVisit',
	async (patientCode: number, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.deleteVisitsRelatedToPatient({ patID: patientCode })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);
