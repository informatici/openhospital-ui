import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { SupplierDTO, SuppliersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new SuppliersApi(customConfiguration());

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async (excludeDeleted: boolean | undefined, thunkApi) =>
    wrapper(() => api.getSuppliers({ excludeDeleted }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (supplierDTO: SupplierDTO, thunkApi) =>
    wrapper(() => api.saveSupplier({ supplierDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async (supplierDTO: SupplierDTO, thunkApi) =>
    wrapper(() => api.updateSupplier({ supplierDTO }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id: number, thunkApi) =>
    wrapper(() => api.deleteSupplier({ id }))
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
