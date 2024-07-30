import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DeliveryResultTypeApi,
  DeliveryResultTypeDTO,
} from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new DeliveryResultTypeApi(customConfiguration());

export const getDeliveryResultTypes = createAsyncThunk(
  "deliveryResultTypes/getDeliveryResultTypes",
  async (_, thunkApi) =>
    api
      .getDeliveryResultTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/createDeliveryResultType",
  async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
    api
      .newDeliveryResultType({ deliveryResultTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/updateDeliveryResultType",
  async (deliveryResultTypeDTO: DeliveryResultTypeDTO, thunkApi) =>
    api
      .updateDeliveryResultTypes({ deliveryResultTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteDeliveryResultType = createAsyncThunk(
  "deliveryResultTypes/deleteDeliveryResultType",
  async (code: string, thunkApi) =>
    api
      .deleteDeliveryResultType({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
