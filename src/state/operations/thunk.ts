import { createAsyncThunk } from "@reduxjs/toolkit";
import { OperationDTO, OperationRowDTO, OperationsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new OperationsApi(customConfiguration());

export const getOperations = createAsyncThunk(
  "operations/getOperations",
  async (_, thunkApi) =>
    api
      .getOperations()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getOperationsByAdmissionId = createAsyncThunk(
  "operations/getOperationsByAdmissionId",
  async (admissionId: number, thunkApi) =>
    api
      .getOperationRowsByAdmt({ admissionId })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOperationRow = createAsyncThunk(
  "operations/createOperationRow",
  async (operationRowDTO: OperationRowDTO, thunkApi) =>
    api
      .newOperationRow({ operationRowDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateOperationRow = createAsyncThunk(
  "operations/updateOperationRow",
  async (operationRowDTO: OperationRowDTO, thunkApi) =>
    api
      .updateOperationRow({ operationRowDTO })
      .toPromise()
      .then(() => operationRowDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteOperationRow = createAsyncThunk(
  "operations/deleteOperationRow",
  async (code: number, thunkApi) =>
    api
      .deleteOperationRow({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createOperation = createAsyncThunk(
  "operations/createOperation",
  async (operationDTO: OperationDTO, thunkApi) =>
    api
      .newOperation({ operationDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateOperation = createAsyncThunk(
  "operations/updateOperation",
  async (payload: { code: string; operationDTO: OperationDTO }, thunkApi) =>
    api
      .updateOperation(payload)
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteOperation = createAsyncThunk(
  "operations/deleteOperation",
  async (code: string, thunkApi) =>
    api
      .deleteOperation({ code })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
