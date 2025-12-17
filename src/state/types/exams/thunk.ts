import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type ExamTypeDTO, ExamTypesApi } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new ExamTypesApi(customConfiguration());

export const getExamTypes = createAsyncThunk(
	'examTypes/getExamTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getExamTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createExamType = createAsyncThunk(
	'examTypes/createExamType',
	async (examTypeDTO: ExamTypeDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newExamType({ examTypeDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateExamType = createAsyncThunk(
	'examTypes/updateExamType',
	async (payload: { code: string; examTypeDTO: ExamTypeDTO }, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateExamType(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const deleteExamType = createAsyncThunk(
	'examTypes/deleteExamType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteExamType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
