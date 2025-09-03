import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { ConditioningDTO, ConditioningsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";
import { Param } from "./params";

const api = new ConditioningsApi(customConfiguration());

export const newConditioning = createAsyncThunk(
  "conditioning/CREATE_CONDITIONING",
  async (conditioningDTO: ConditioningDTO, thunkApi) =>
    wrapper(() => api.newConditioning({ conditioningDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateConditioning = createAsyncThunk(
  "conditioning/UPDATE_CONDITIONING",
  async ({ id, body }: Param, thunkApi) =>
    wrapper(() => api.updateConditioning({ id, conditioningDTO: body }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getConditioningByPatientCode = createAsyncThunk(
  "conditioning/GET_CONDITIONINGS_BY_PATIENT",
  async (patientCode: number, thunkApi) =>
    wrapper(() => api.getConditioningByPatientCode({ patientCode }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
