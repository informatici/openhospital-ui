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

/**
 * @param payload The update permission with groups
 * this might be deprecated with OH2-363 and OP-1309
 */
export const updatePermission = createAsyncThunk(
  "permissions/getPermission",
  async (payload: { id: number; permissionDTO: PermissionDTO }, thunkApi) =>
    api
      .updatePermission(payload)
      .toPromise()

      .then(() => payload.permissionDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);
