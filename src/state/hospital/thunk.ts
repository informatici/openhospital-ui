import { createAsyncThunk } from "@reduxjs/toolkit";
import { HospitalsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new HospitalsApi(customConfiguration(false));

export const getHospital = createAsyncThunk(
  "hospitals/getHospital",
  async (_, thunkApi) =>
    api
      .getHospital()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
