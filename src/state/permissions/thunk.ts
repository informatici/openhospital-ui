import { createAsyncThunk } from "@reduxjs/toolkit";
import { PermissionDTO, PermissionsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new PermissionsApi(customConfiguration());

export const getAllPermissions = createAsyncThunk<PermissionDTO[], void>(
  "permissions/getPermissions",
  async (_, thunkApi) =>
    api
      .retrieveAllPermissions()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
