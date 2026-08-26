import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	DeliveryResultTypeApi,
	type DeliveryResultTypeDTO,
} from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new DeliveryResultTypeApi(customConfiguration());

export const getDeliveryResultTypes = createAsyncThunk(
	'deliveryResultTypes/getDeliveryResultTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDeliveryResultTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createDeliveryResultType = createAsyncThunk(
	'deliveryResultTypes/createDeliveryResultType',
	async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newDeliveryResultType({ deliveryResultTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateDeliveryResultType = createAsyncThunk(
	'deliveryResultTypes/updateDeliveryResultType',
	async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateDeliveryResultTypes({ deliveryResultTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteDeliveryResultType = createAsyncThunk(
	'deliveryResultTypes/deleteDeliveryResultType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteDeliveryResultType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
