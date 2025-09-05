import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { MedicalHistoryApi, MedicalHistoryDTO } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new MedicalHistoryApi(customConfiguration());

export const createMedicalHistory = createAsyncThunk(
  "admissions/CREATE_MEDICAL_HISTORY",
  async (medicalHistoryDTO: MedicalHistoryDTO, thunkApi) =>
    wrapper(() => api.createMedicalHistory({ medicalHistoryDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateMedicalHistory = createAsyncThunk(
  "admissions/UPDATE_MEDICAL_HISTORY",
  async (
    payload: { id: number; medicalHistoryDTO: MedicalHistoryDTO },
    thunkApi
  ) =>
    wrapper(() =>
      api.updateMedicalHistory({
        id: payload.id,
        medicalHistoryDTO: payload.medicalHistoryDTO,
      })
    )
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getMedicalHistoryById = createAsyncThunk(
  "admissions/GET_MEDICAL_HISTORY_BY_ID",
  async (id: number, thunkApi) =>
    wrapper(() => api.getMedicalHistoryById({ id }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getMedicalHistoryByPatientCode = createAsyncThunk(
  "admissions/GET_MEDICAL_HISTORY_BY_PATIENT_CODE",
  async (patientCode: number, thunkApi) =>
    wrapper(() => api.getMedicalHistoryByPatientCode({ patientCode }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
