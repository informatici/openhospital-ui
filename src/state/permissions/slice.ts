import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const permissionSlice = createSlice({
  name: "permissions",
  initialState: initial,
  reducers: {
    updatePermissionReset: (state) => {
      state.update = initial.update;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Permissions
      .addCase(thunks.getAllPermissions.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getAllPermissions.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getAllPermissions.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })

      // Update Permission
      .addCase(thunks.updatePermission.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updatePermission.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updatePermission.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      }),
});

export const { updatePermissionReset } = permissionSlice.actions;
