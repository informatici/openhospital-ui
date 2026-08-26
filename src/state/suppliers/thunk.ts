import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type SupplierDTO, SuppliersApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new SuppliersApi(customConfiguration());

export const getSuppliers = createAsyncThunk(
	'suppliers/getSuppliers',
	async (excludeDeleted: boolean | undefined, thunkApi) =>
		firstValueFrom(wrapper(() => api.getSuppliers({ excludeDeleted }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const createSupplier = createAsyncThunk(
	'suppliers/createSupplier',
	async (supplierDTO: SupplierDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.saveSupplier({ supplierDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateSupplier = createAsyncThunk(
	'suppliers/updateSupplier',
	async (supplierDTO: SupplierDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateSupplier({ supplierDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteSupplier = createAsyncThunk(
	'suppliers/deleteSupplier',
	async (id: number, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteSupplier({ id }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
