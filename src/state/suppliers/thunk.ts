import { createAsyncThunk } from "@reduxjs/toolkit";
import { SupplierDTO, SuppliersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new SuppliersApi(customConfiguration());

export const getSuppliers = createAsyncThunk(
  "suppliers/getSuppliers",
  async (excludeDeleted: boolean | undefined, thunkApi) =>
    api
      .getSuppliers({ excludeDeleted })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (supplierDTO: SupplierDTO, thunkApi) =>
    api
      .saveSupplier({ supplierDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async (supplierDTO: SupplierDTO, thunkApi) =>
    api
      .updateSupplier({ supplierDTO })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
