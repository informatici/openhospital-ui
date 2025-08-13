import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { MedicalTypeDTO, MedicalTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new MedicalTypesApi(customConfiguration());

export const getMedicalTypes = createAsyncThunk(
  "medicalTypes/getMedicalTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getMedicalTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createMedicalType = createAsyncThunk(
  "medicalTypes/createMedicalType",
  async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
    wrapper(() => api.createMedicalType({ medicalTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateMedicalType = createAsyncThunk(
  "medicalTypes/updateMedicalType",
  async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
    wrapper(() => api.updateMedicalType({ medicalTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteMedicalType = createAsyncThunk(
  "medicalTypes/deleteMedicalType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteMedicalType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
