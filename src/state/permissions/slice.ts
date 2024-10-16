import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const permissionSlice = createSlice({
  name: "permissions",
  initialState: initial,
  reducers: {},
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
      }),
});
