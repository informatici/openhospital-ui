import { createAsyncThunk } from "@reduxjs/toolkit";
import { WardDTO, WardsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new WardsApi(customConfiguration());

export const getWards = createAsyncThunk(
  "wards/getWards",
  async (_, thunkApi) =>
    api
      .getWards()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createWard = createAsyncThunk(
  "wards/createWard",
  async (wardDTO: WardDTO, thunkApi) =>
    api
      .newWard({ wardDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateWard = createAsyncThunk(
  "wards/updateWard",
  async (wardDTO: WardDTO, thunkApi) =>
    api
      .updateWard({ wardDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteWard = createAsyncThunk(
  "wards/deleteWard",
  async (code: string, thunkApi) =>
    api
      .deleteWard({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
