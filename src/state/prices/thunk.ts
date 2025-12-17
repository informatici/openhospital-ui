import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type PriceListDTO, PriceListsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new PriceListsApi(customConfiguration());

export const getPrices = createAsyncThunk(
	'prices/getPrices',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getPrices())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getPriceLists = createAsyncThunk(
	'prices/getPriceLists',
	async (_, thunkApi) =>
		firstValueFrom(wrapper(() => api.getPriceLists())).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createPriceList = createAsyncThunk(
	'prices/createPriceList',
	async (priceListDTO: PriceListDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newPriceList({ priceListDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updatePriceList = createAsyncThunk(
	'prices/updatePriceList',
	async (payload: { id: number; priceListDTO: PriceListDTO }, thunkApi) =>
		firstValueFrom(wrapper(() => api.updatePriceLists(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deletePriceList = createAsyncThunk(
	'prices/deletePriceList',
	async (id: number, thunkApi) =>
		firstValueFrom(wrapper(() => api.deletePriceList({ id }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
