import { createAsyncThunk } from "@reduxjs/toolkit";
import { HospitalDTO, HospitalsApi } from "../../generated";
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

export const updateHospital = createAsyncThunk(
  "hospitals/updateHospital",
  async (payload: { code: string; hospitalDTO: HospitalDTO }, thunkApi) =>
    api
      .updateHospital(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
