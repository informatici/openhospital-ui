import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { VaccineDTO, VaccinesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new VaccinesApi(customConfiguration());

export const getVaccines = createAsyncThunk(
  "vaccines/getVaccines",
  async (_, thunkApi) =>
    wrapper(() => api.getVaccines())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createVaccine = createAsyncThunk(
  "vaccines/createVaccine",
  async (vaccineDTO: VaccineDTO, thunkApi) =>
    wrapper(() => api.newVaccine({ vaccineDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateVaccine = createAsyncThunk(
  "vaccines/updateVaccine",
  async (vaccineDTO: VaccineDTO, thunkApi) =>
    wrapper(() => api.updateVaccine({ vaccineDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteVaccine = createAsyncThunk(
  "vaccines/deleteVaccine",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteVaccine({ code }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
