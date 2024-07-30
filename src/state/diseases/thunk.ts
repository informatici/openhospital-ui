import { createAsyncThunk } from "@reduxjs/toolkit";
import { DiseaseDTO, DiseasesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new DiseasesApi(customConfiguration());

export const getAllDiseases = createAsyncThunk(
  "diseases/getAllDiseases",
  async (_, thunkApi) =>
    api
      .getAllDiseases()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getDiseasesOpd = createAsyncThunk(
  "diseases/getDiseasesOpd",
  async (_, thunkApi) =>
    api
      .getDiseasesOpd()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getDiseasesIpdIn = createAsyncThunk(
  "diseases/getDiseasesIpdIn",
  async (_, thunkApi) =>
    api
      .getDiseasesIpdIn()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getDiseasesIpdOut = createAsyncThunk(
  "diseases/getDiseasesIpdOut",
  async (_, thunkApi) =>
    api
      .getDiseasesIpdOut()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDisease = createAsyncThunk(
  "diseases/createDisease",
  async (diseaseDTO: DiseaseDTO, thunkApi) =>
    api
      .newDisease({ diseaseDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDisease = createAsyncThunk(
  "diseases/updateDisease",
  async (diseaseDTO: DiseaseDTO, thunkApi) =>
    api
      .updateDisease({ diseaseDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
