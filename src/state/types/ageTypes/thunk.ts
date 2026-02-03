import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { AgeTypeDTO, AgeTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new AgeTypesApi(customConfiguration());

export const getAgeTypes = createAsyncThunk(
  "ageTypes/getAll",
  async (_, thunkApi) =>
    wrapper(() => api.getAllAgeTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateAgeTypes = createAsyncThunk(
  "ageTypes/update",
  async (ageTypeDTO: AgeTypeDTO[], thunkApi) =>
    wrapper(() => api.updateAgeType({ ageTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
