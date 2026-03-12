import { createAsyncThunk } from '@reduxjs/toolkit';
import { firstValueFrom } from 'rxjs';
import { wrapper } from '~/libraries/apiUtils/wrapper';
import { type AdmissionDTO, AdmissionsApi } from '../../generated';
import { customConfiguration } from '../../libraries/apiUtils/configuration';

const api = new AdmissionsApi(customConfiguration());

export const createAdmission = createAsyncThunk(
	'admissions/CREATE_ADMISSION',
	async (admissionDTO: AdmissionDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.newAdmissions({ admissionDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const updateAdmission = createAsyncThunk(
	'admissions/UPDATE_ADMISSION',
	async (admissionDTO: AdmissionDTO, thunkApi) =>
		firstValueFrom(wrapper(() => api.updateAdmissions({ admissionDTO }))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const dischargePatient = createAsyncThunk(
	'admissions/DISCHARGE_PATIENT',
	async (
		payload: { patientCode: number; admissionDTO: AdmissionDTO },
		thunkApi,
	) =>
		firstValueFrom(wrapper(() => api.dischargePatient(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const getDischarges = createAsyncThunk(
	'admissions/GET_DISCHARGES',
	async (
		payload: { dischargerange: string[]; page?: number; size?: number },
		thunkApi,
	) =>
		firstValueFrom(
			wrapper(() =>
				api.getDischarges({
					...payload,
					page: payload.page ?? 0,
					size: payload.size ?? 80,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getAdmissions = createAsyncThunk(
	'admissions/GET_ADMISSIONS',
	async (
		payload: { admissionrange: string[]; page?: number; size?: number },
		thunkApi,
	) =>
		firstValueFrom(
			wrapper(() =>
				api.getAdmissions({
					...payload,
					page: payload.page ?? 0,
					size: payload.size ?? 80,
				}),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);

export const getPatientAdmissions = createAsyncThunk(
	'admissions/GET_PATIENT_ADMISSIONS',
	async (payload: { patientCode: number }, thunkApi) =>
		firstValueFrom(wrapper(() => api.getAdmissions1(payload))).catch((error) =>
			thunkApi.rejectWithValue(error.response),
		),
);

export const getAdmittedPatients = createAsyncThunk(
	'admissions/getAdmittedPatients',
	async (
		payload: {
			admissionrange: string[] | undefined;
			dischargerange: string[] | undefined;
			searchterms: string | undefined;
		},
		thunkApi,
	) =>
		firstValueFrom(wrapper(() => api.getAdmittedPatients(payload))).catch(
			(error) => thunkApi.rejectWithValue(error.response),
		),
);

export const getCurrentAdmission = createAsyncThunk(
	'admissions/getCurrentAdmission',
	async (patientCode: number | undefined, thunkApi) =>
		firstValueFrom(
			wrapper(() =>
				api.getCurrentAdmission({ patientCode: patientCode ?? -1 }),
			),
		).catch((error) => thunkApi.rejectWithValue(error.response)),
);
