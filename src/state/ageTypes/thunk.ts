import { createAsyncThunk } from "@reduxjs/toolkit";
import { AgeTypesApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new AgeTypesApi(customConfiguration());

export const getAgeTypes = createAsyncThunk(
  "ageTypes/getAgeTypes",
  async (_, thunkApi) =>
    api
      .getAllAgeTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
