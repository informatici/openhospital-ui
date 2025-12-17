import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	LaboratoriesApi,
	type LaboratoryDTO,
	type LabWithRowsDTO,
	type UpdateLaboratoryRequest,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new LaboratoriesApi(customConfiguration());

export const searchLabs = createAsyncThunk(
	'laboratories/searchLabs',
	async (query: any, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getLaboratoryForPrint({
					dateFrom: query.dateFrom ?? moment().add('-30', 'days').toISOString(),
					dateTo: query.dateTo ?? moment().toISOString(),
					examName: query.examName,
					patientCode: !Number.isNaN(query.patientCode)
						? query.patientCode
						: undefined,
					status: query.status ?? undefined,
					paged: query.paged,
					page: query.page,
					size: query.size,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getLabsByPatientId = createAsyncThunk(
	'laboratories/getLabsByPatientId',
	async (patId: number | undefined, thunkApi) =>
		firstValueFrom(wrapper(() => api.getLaboratory1({ patId: patId ?? -1 })))
			.then((result) =>
				(result ?? []).map((item) =>
					item.laboratoryDTO ? item : { laboratoryDTO: item },
				),
			)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getLabsRequestByPatientId = createAsyncThunk(
	'laboratories/getLabsRequestByPatientId',
	async (patId: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getLaboratoryExamRequest1({ patId: patId ?? -1 })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getLabByCode = createAsyncThunk(
	'laboratories/getLabByCode',
	async (patId: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getLaboratory1({ patId: patId ?? -1 })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getLabWithRowsByCode = createAsyncThunk(
	'laboratories/getLabWithRowsByCode',
	async (code: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getExamWithRowsById({ code: code ?? -1 })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getMaterials = createAsyncThunk(
	'laboratories/getMaterials',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getMaterials())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createLab = createAsyncThunk(
	'laboratories/createLab',
	async (labWithRowsDTO: LabWithRowsDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newLaboratory({ labWithRowsDTO })))
			.then(() => labWithRowsDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createLabRequest = createAsyncThunk(
	'laboratories/createLabRequest',
	async (laboratoryDTO: LaboratoryDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newExamRequest({ laboratoryDTO })))
			.then(() => laboratoryDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateLab = createAsyncThunk(
	'laboratories/updateLab',
	async (payload: UpdateLaboratoryRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateLaboratory(payload)))
			.then(() => ({ ...payload.labWithRowsDTO }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateLabStatus = createAsyncThunk(
	'laboratories/updateLabStatus',
	async (payload: { code: number; status: string }, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateExamRequest(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteLab = createAsyncThunk(
	'laboratories/deleteLab',
	async (code: number | undefined, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteExam({ code: code ?? -1 }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const cancelLab = createAsyncThunk(
	'laboratories/cancelLab',
	async (code: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.deleteExamRequest({ code: code ?? -1 })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);
