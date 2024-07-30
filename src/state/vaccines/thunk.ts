import { createAsyncThunk } from "@reduxjs/toolkit";
import { VaccineDTO, VaccinesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new VaccinesApi(customConfiguration());

export const getVaccines = createAsyncThunk(
  "vaccines/getVaccines",
  async (_, thunkApi) =>
    api
      .getVaccines()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createVaccine = createAsyncThunk(
  "vaccines/createVaccine",
  async (vaccineDTO: VaccineDTO, thunkApi) =>
    api
      .newVaccine({ vaccineDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateVaccine = createAsyncThunk(
  "vaccines/updateVaccine",
  async (vaccineDTO: VaccineDTO, thunkApi) =>
    api
      .updateVaccine({ vaccineDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteVaccine = createAsyncThunk(
  "vaccines/deleteVaccine",
  async (code: string, thunkApi) =>
    api
      .deleteVaccine({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
