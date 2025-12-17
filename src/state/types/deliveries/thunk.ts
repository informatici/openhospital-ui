import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { DeliveryTypeApi, type DeliveryTypeDTO } from '../../../generated';
import { customConfiguration } from '../../../libraries/apiUtils/configuration';

const api = new DeliveryTypeApi(customConfiguration());

export const getDeliveryTypes = createAsyncThunk(
	'deliveryTypes/getDeliveryTypes',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getDeliveryTypes())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createDeliveryType = createAsyncThunk(
	'deliveryTypes/createDeliveryType',
	async (deliveryTypeDTO: DeliveryTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newDeliveryType({ deliveryTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const updateDeliveryType = createAsyncThunk(
	'deliveryTypes/updateDeliveryType',
	async (deliveryTypeDTO: DeliveryTypeDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.updateDeliveryTypes({ deliveryTypeDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const deleteDeliveryType = createAsyncThunk(
	'deliveryTypes/deleteDeliveryType',
	async (code: string, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteDeliveryType({ code })))
			.then(() => ({ code }))
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);
