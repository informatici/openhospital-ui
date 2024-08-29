import { createAsyncThunk } from "@reduxjs/toolkit";
import { DiseaseTypeDTO, DiseaseTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DiseaseTypesApi(customConfiguration());

export const getDiseaseTypes = createAsyncThunk(
  "diseaseTypes/getDiseaseTypes",
  async (_, thunkApi) =>
    api
      .getAllDiseaseTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDiseaseType = createAsyncThunk(
  "diseaseTypes/createDiseaseType",
  async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
    api
      .newDiseaseType({ diseaseTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDiseaseType = createAsyncThunk(
  "diseaseTypes/updateDiseaseType",
  async (diseaseTypeDTO: DiseaseTypeDTO, thunkApi) =>
    api
      .updateDiseaseType({ diseaseTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDiseaseType = createAsyncThunk(
  "diseaseTypes/deleteDiseaseType",
  async (code: string, thunkApi) =>
    api
      .deleteDiseaseType({ code })
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
