import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import {
  DeliveryResultTypeApi,
  DeliveryResultTypeDTO,
} from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DeliveryResultTypeApi(customConfiguration());

export const getDeliveryResultTypes = createAsyncThunk(
  "deliveryResultTypes/getDeliveryResultTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getDeliveryResultTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/createDeliveryResultType",
  async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
    wrapper(() => api.newDeliveryResultType({ deliveryResultTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/updateDeliveryResultType",
  async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
    wrapper(() => api.updateDeliveryResultTypes({ deliveryResultTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/deleteDeliveryResultType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteDeliveryResultType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
