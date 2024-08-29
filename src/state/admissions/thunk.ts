import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdmissionDTO, AdmissionsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new AdmissionsApi(customConfiguration());

export const createAdmission = createAsyncThunk(
  "admissions/CREATE_ADMISSION",
  async (admissionDTO: AdmissionDTO, thunkApi) =>
    api
      .newAdmissions({ admissionDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateAdmission = createAsyncThunk(
  "admissions/UPDATE_ADMISSION",
  async (admissionDTO: AdmissionDTO, thunkApi) =>
    api
      .updateAdmissions({ admissionDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const dischargePatient = createAsyncThunk(
  "admissions/DISCHARGE_PATIENT",
  async (
    payload: { patientCode: number; admissionDTO: AdmissionDTO },
    thunkApi
  ) =>
    api
      .dischargePatient(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getDischarges = createAsyncThunk(
  "admissions/GET_DISCHARGES",
  async (
    payload: { dischargerange: string[]; page?: number; size?: number },
    thunkApi
  ) =>
    api
      .getDischarges({
        ...payload,
        page: payload.page ?? 0,
        size: payload.size ?? 80,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getAdmissions = createAsyncThunk(
  "admissions/GET_ADMISSIONS",
  async (
    payload: { admissionrange: string[]; page?: number; size?: number },
    thunkApi
  ) =>
    api
      .getAdmissions({
        ...payload,
        page: payload.page ?? 0,
        size: payload.size ?? 80,
      })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getPatientAdmissions = createAsyncThunk(
  "admissions/GET_PATIENT_ADMISSIONS",
  async (payload: { patientCode: number }, thunkApi) =>
    api
      .getAdmissions1(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getAdmittedPatients = createAsyncThunk(
  "admissions/getAdmittedPatients",
  async (
    payload: {
      admissionrange: string[] | undefined;
      dischargerange: string[] | undefined;
      searchterms: string | undefined;
    },
    thunkApi
  ) =>
    api
      .getAdmittedPatients(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getCurrentAdmission = createAsyncThunk(
  "admissions/getCurrentAdmission",
  async (patientCode: number | undefined, thunkApi) =>
    api
      .getCurrentAdmission({ patientCode: patientCode ?? -1 })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
