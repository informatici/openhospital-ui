import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { OperationsTypesApi, type OperationTypeDTO } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new OperationsTypesApi(customConfiguration());

export const getOperationTypes = createAsyncThunk(
	'operationTypes/getOperationTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getOperationTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createOperationType = createAsyncThunk(
	'operationTypes/createOperationType',
	async (operationTypeDTO: OperationTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newOperationType({ operationTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateOperationType = createAsyncThunk(
	'operationTypes/updateOperationType',
	async (
		payload: { code: string; operationTypeDTO: OperationTypeDTO },
		thunkApi,
	) =>
		firstValueFrom(wrapper(() => api.updateOperationTypes(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteOperationType = createAsyncThunk(
	'operationTypes/deleteOperationType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteOperationType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
