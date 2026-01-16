import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import {
	type OpdDTO,
	OpdsApi,
	type OpdWithOperationRowDTO,
	type UpdateOpdWithOperationRowRequest,
} from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new OpdsApi(customConfiguration());

export const getOpds = createAsyncThunk(
	'opds/getOpds',
	async (patientCode: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getOpdByPatient({
					pcode: patientCode ?? -1,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getOpdsWithOperationRows = createAsyncThunk(
	'opds/getOpdsWithOperationRows',
	async (patientCode: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getOpdByPatient({
					pcode: patientCode ?? -1,
				}),
			),
		)
			.then((result) =>
				(result ?? []).map((item) =>
					item.opdDTO ? item : ({ opdDTO: item } as OpdWithOperationRowDTO),
				),
			)
			.catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const searchOpds = createAsyncThunk(
	'opds/searchOpds',
	async (query: any, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getOpdByDates({
					sex: isEmpty(query.sex) ? null : query.sex,
					newPatient: isEmpty(query.newPatient) ? null : query.newPatient,
					dateFrom: query.dateFrom ?? moment().add('-30', 'days').toISOString(),
					dateTo: query.dateTo ?? moment().toISOString(),
					ageFrom: Number.isNaN(query.ageFrom) ? null : query.ageFrom,
					ageTo: Number.isNaN(query.ageTo) ? null : query.ageTo,
					diseaseCode: isEmpty(query.diseaseCode) ? null : query.diseaseCode,
					diseaseTypeCode: isEmpty(query.diseaseTypeCode)
						? null
						: query.diseaseTypeCode,
					patientCode: Number.isNaN(query.patientCode)
						? null
						: query.patientCode,
					wardCode: isEmpty(query.wardCode) ? null : query.wardCode,
					paged: !!query.paged,
					page: Number.isNaN(query.page) ? 0 : query.page,
					size: Number.isNaN(query.size) ? 80 : query.size,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getLastOpd = createAsyncThunk(
	'opds/getLastOpd',
	async (patientCode: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getLastOpd({
					patientCode: patientCode ?? -1,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const createOpd = createAsyncThunk(
	'opds/createOpd',
	async (opdDTO: OpdDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newOpd({ opdDTO }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const createOpdWithOperationsRow = createAsyncThunk(
	'opds/createOpdWithOperationsRow',
	async (opdWithOperationRowDTO: OpdWithOperationRowDTO, thunkApi) =>
		firstValueFrom(
			wrapper(() => api.newOpdWithOperationRow({ opdWithOperationRowDTO })),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

/**
 *
 * @param payload The update operation payload
 * @returns
 * @deprecated
 */
export const updateOpd = createAsyncThunk(
	'opds/updateOpd',
	async (payload: { code: number; opdDTO: OpdDTO }, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateOpd(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const updateOpdWithOperationRow = createAsyncThunk(
	'opds/updateOpdWithOperationRow',
	async (payload: UpdateOpdWithOperationRowRequest, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateOpdWithOperationRow(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const deleteOpd = createAsyncThunk(
	'opds/deleteOpd',
	async (code: number, thunkApi) =>
		firstValueFrom(wrapper(() => api.deleteOpd({ code }))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);
