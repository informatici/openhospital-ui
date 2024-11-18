import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import {
  GetMedicalsSortByEnum,
  MedicalDTO,
  MedicalsApi,
} from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new MedicalsApi(customConfiguration());

export const getMedicals = createAsyncThunk(
  "medicals/getMedicals",
  async (_, thunkApi) =>
    wrapper(() =>
      api.getMedicals({
        sortBy: GetMedicalsSortByEnum.NAME,
      })
    )
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createMedical = createAsyncThunk(
  "medicals/createMedical",
  async (medicalDTO: MedicalDTO, thunkApi) =>
    wrapper(() => api.newMedical({ medicalDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateMedical = createAsyncThunk(
  "medicals/updateMedical",
  async (medicalDTO: MedicalDTO, thunkApi) =>
    wrapper(() => api.updateMedical({ medicalDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteMedical = createAsyncThunk(
  "medicals/deleteMedical",
  async (code: number, thunkApi) =>
    wrapper(() => api.deleteMedical({ code }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
