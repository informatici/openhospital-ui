import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	ExamRowsApi,
	ExamsApi,
	type NewExamRequest,
	type UpdateExamRequest,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new ExamsApi(customConfiguration());

const examRowsApi = new ExamRowsApi(customConfiguration());

export const getExams = createAsyncThunk(
	'exams/getExams',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getExams())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getExamRows = createAsyncThunk(
	'exams/getExamRows',
	async (examCode: string, thunkApi) =>
		firstValueFrom(
			wrapper(() => examRowsApi.getExamRowsByExamCode({ examCode })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createExam = createAsyncThunk(
	'exams/createExam',
	async (payload: NewExamRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.newExam(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateExam = createAsyncThunk(
	'exams/updateExam',
	async (payload: UpdateExamRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateExam(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const deleteExam = createAsyncThunk(
	'exams/deleteExam',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteExam1({ code }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
