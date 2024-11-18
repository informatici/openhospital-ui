import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { DiseaseTypeDTO, DiseaseTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DiseaseTypesApi(customConfiguration());

export const getDiseaseTypes = createAsyncThunk(
  "diseaseTypes/getDiseaseTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getAllDiseaseTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDiseaseType = createAsyncThunk(
  "diseaseTypes/createDiseaseType",
  async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
    wrapper(() => api.newDiseaseType({ diseaseTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDiseaseType = createAsyncThunk(
  "diseaseTypes/updateDiseaseType",
  async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
    wrapper(() => api.updateDiseaseType({ diseaseTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDiseaseType = createAsyncThunk(
  "diseaseTypes/deleteDiseaseType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteDiseaseType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
