import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	type OperationDTO,
	type OperationRowDTO,
	OperationsApi,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new OperationsApi(customConfiguration());

export const getOperations = createAsyncThunk(
	'operations/getOperations',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getOperations())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getOperationsByAdmissionId = createAsyncThunk(
	'operations/getOperationsByAdmissionId',
	async (admissionId: number, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.getOperationRowsByAdmt({ admissionId })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createOperationRow = createAsyncThunk(
	'operations/createOperationRow',
	async (operationRowDTO: OperationRowDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newOperationRow({ operationRowDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateOperationRow = createAsyncThunk(
	'operations/updateOperationRow',
	async (operationRowDTO: OperationRowDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateOperationRow({ operationRowDTO })))
			.then(() => operationRowDTO)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteOperationRow = createAsyncThunk(
	'operations/deleteOperationRow',
	async (code: number, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteOperationRow({ code }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const createOperation = createAsyncThunk(
	'operations/createOperation',
	async (operationDTO: OperationDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newOperation({ operationDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateOperation = createAsyncThunk(
	'operations/updateOperation',
	async (payload: { code: string; operationDTO: OperationDTO }, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateOperation(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const deleteOperation = createAsyncThunk(
	'operations/deleteOperation',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteOperation({ code }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);
