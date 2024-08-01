import { createAsyncThunk } from "@reduxjs/toolkit";
import { DischargeTypeApi, DischargeTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DischargeTypeApi(customConfiguration());

export const getDischargeTypes = createAsyncThunk(
  "dischargeTypes/getDischargeTypes",
  async (_, thunkApi) =>
    api
      .getDischargeTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDischargeType = createAsyncThunk(
  "dischargeTypes/createDischargeType",
  async (dischargeTypeDTO: DischargeTypeDTO, thunkApi) =>
    api
      .newDischargeType({ dischargeTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDischargeType = createAsyncThunk(
  "dischargeTypes/updateDischargeType",
  async (dischargeTypeDTO: DischargeTypeDTO, thunkApi) =>
    api
      .updateDischargeTypet({ dischargeTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDischargeType = createAsyncThunk(
  "dischargeTypes/deleteDischargeType",
  async (code: string, thunkApi) =>
    api
      .deleteDischargeType({ code })
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
