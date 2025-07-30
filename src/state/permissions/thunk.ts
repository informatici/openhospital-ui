import { createAsyncThunk } from "@reduxjs/toolkit";
import { wrapper } from "libraries/apiUtils/wrapper";
import { firstValueFrom } from "rxjs";
import { PermissionDTO, PermissionsApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new PermissionsApi(customConfiguration());

export const getAllPermissions = createAsyncThunk<PermissionDTO[], void>(
  "permissions/getPermissions",
  async (_, thunkApi) =>
    firstValueFrom(wrapper(() => api.retrieveAllPermissions())).catch((error) =>
      thunkApi.rejectWithValue(error.response)
    )
);
