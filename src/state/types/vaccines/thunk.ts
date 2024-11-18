import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { VaccineTypeApi, VaccineTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new VaccineTypeApi(customConfiguration());

export const getVaccineTypes = createAsyncThunk(
  "vaccineTypes/getVaccineTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getVaccineType())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createVaccineType = createAsyncThunk(
  "vaccineTypes/createVaccineType",
  async (vaccineTypeDTO: VaccineTypeDTO, thunkApi) =>
    wrapper(() => api.newVaccineType({ vaccineTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateVaccineType = createAsyncThunk(
  "vaccineTypes/updateVaccineType",
  async (vaccineTypeDTO: VaccineTypeDTO, thunkApi) =>
    wrapper(() => api.updateVaccineType({ vaccineTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteVaccineType = createAsyncThunk(
  "vaccineTypes/deleteVaccineType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteVaccineType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
