import { createAsyncThunk } from "@reduxjs/toolkit";
import { OperationTypeDTO, OperationsTypesApi } from "../../../generated";
import { customConfiguration } from "../../../libraries/apiUtils/configuration";

const api = new OperationsTypesApi(customConfiguration());

export const getOperationTypes = createAsyncThunk(
  "operationTypes/getOperationTypes",
  async (_, thunkApi) =>
    api
      .getOperationTypes()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOperationType = createAsyncThunk(
  "operationTypes/createOperationType",
  async (operationTypeDTO: OperationTypeDTO, thunkApi) =>
    api
      .newOperationType({ operationTypeDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateOperationType = createAsyncThunk(
  "operationTypes/updateOperationType",
  async (
    payload: { code: string; operationTypeDTO: OperationTypeDTO },
    thunkApi
  ) =>
    api
      .updateOperationTypes(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteOperationType = createAsyncThunk(
  "operationTypes/deleteOperationType",
  async (code: string, thunkApi) =>
    api
      .deleteOperationType({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
