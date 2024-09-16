import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGroupDTO, UsersApi } from "../../generated";
import { customConfiguration } from "../../libraries/apiUtils/configuration";

const api = new UsersApi(customConfiguration());

export const getUserGroups = createAsyncThunk(
  "userGroups/getUserGroups",
  async (_, thunkApi) =>
    api
      .getUserGroup()
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const createUserGroup = createAsyncThunk(
  "userGroups/createUserGroup",
  async (userGroupDTO: UserGroupDTO, thunkApi) =>
    api
      .newUserGroup({ userGroupDTO })
      .toPromise()
      .then(() => userGroupDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const updateUserGroup = createAsyncThunk(
  "userGroups/updateUserGroup",
  async (userGroupDTO: UserGroupDTO, thunkApi) =>
    api
      .updateUserGroup({ userGroupDTO })
      .toPromise()
      .then(() => userGroupDTO)
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const deleteUserGroup = createAsyncThunk(
  "userGroups/deleteUserGroup",
  async (groupCode: string, thunkApi) =>
    api
      .deleteGroup({ groupCode })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const getUserGroup = createAsyncThunk(
  "userGroups/getUserGroup",
  async (groupCode: string, thunkApi) =>
    api
      // GET /users/groups/{group_code}
      .getUserGroup1({ groupCode })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const assignPermission = createAsyncThunk(
  "userGroups/setUserGroupPermission",
  async (
    { permissionId, groupCode }: { permissionId: number; groupCode: string },
    thunkApi
  ) =>
    api
      .assignPermission({ groupCode, id: permissionId })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);

export const revokePermission = createAsyncThunk(
  "userGroups/setUserGroupPermission",
  async (
    { permissionId, groupCode }: { permissionId: number; groupCode: string },
    thunkApi
  ) =>
    api
      .revokePermission({ groupCode, id: permissionId })
      .toPromise()
      .catch((error) => thunkApi.rejectWithValue(error.response))
);