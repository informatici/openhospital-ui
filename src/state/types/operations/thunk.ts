import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { OperationTypeDTO, OperationsTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new OperationsTypesApi(customConfiguration());

export const getOperationTypes = createAsyncThunk(
  "operationTypes/getOperationTypes",
  async (_, thunkApi) =>
    wrapper(() => api.getOperationTypes())
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOperationType = createAsyncThunk(
  "operationTypes/createOperationType",
  async (operationTypeDTO: OperationTypeDTO, thunkApi) =>
    wrapper(() => api.newOperationType({ operationTypeDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateOperationType = createAsyncThunk(
  "operationTypes/updateOperationType",
  async (
    payload: { code: string; operationTypeDTO: OperationTypeDTO },
    thunkApi
  ) =>
    wrapper(() => api.updateOperationTypes(payload))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteOperationType = createAsyncThunk(
  "operationTypes/deleteOperationType",
  async (code: string, thunkApi) =>
    wrapper(() => api.deleteOperationType({ code }))
      .toPromise()
      .then(() => ({ code }))
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
