import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { DeliveryTypeApi, DeliveryTypeDTO } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DeliveryTypeApi(customConfiguration());

export const getDeliveryTypes = createAsyncThunk(
  "deliveryTypes/getDeliveryTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getDeliveryTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDeliveryType = createAsyncThunk(
  "deliveryTypes/createDeliveryType",
  async (deliveryTypeDTO: DeliveryTypeDTO, thunkApi) =>
    wrapper(() => api.newDeliveryType({ deliveryTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDeliveryType = createAsyncThunk(
  "deliveryTypes/updateDeliveryType",
  async (deliveryTypeDTO: DeliveryTypeDTO, thunkApi) =>
    wrapper(() => api.updateDeliveryTypes({ deliveryTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDeliveryType = createAsyncThunk(
  "deliveryTypes/deleteDeliveryType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteDeliveryType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
