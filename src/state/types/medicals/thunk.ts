import { createAsyncThunk } from "@reduxjs/toolkit";
import { MedicalTypesApi, MedicalTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new MedicalTypesApi(customConfiguration());

export const getMedicalTypes = createAsyncThunk(
  "medicalTypes/getMedicalTypes",
  async (_, thunkApi) =>
    api
      .getMedicalTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createMedicalType = createAsyncThunk(
  "medicalTypes/createMedicalType",
  async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
    api
      .createMedicalType({ medicalTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateMedicalType = createAsyncThunk(
  "medicalTypes/updateMedicalType",
  async (medicalTypeDTO: MedicalTypeDTO, thunkApi) =>
    api
      .updateMedicalType({ medicalTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteMedicalType = createAsyncThunk(
  "medicalTypes/deleteMedicalType",
  async (code: string, thunkApi) =>
    api
      .deleteMedicalType({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
