import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const wardSlice = createSlice({
  name: "wards",
  initialState: initial,
  reducers: {
    createWardReset: (state) => {
      state.create = initial.create;
    },
    updateWardReset: (state) => {
      state.update = initial.update;
    },
    deleteWardReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get All Wards
      .addCase(thunks.getWards.pending, (state) => {
        state.allWards = ApiResponse.loading();
      })
      .addCase(thunks.getWards.fulfilled, (state, action) => {
        state.allWards = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getWards.rejected, (state, action) => {
        state.allWards = ApiResponse.error(action.payload);
      })
      // Create Ward
      .addCase(thunks.createWard.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createWard.fulfilled, (state, action) => {
        state.create= ApiResponse.value(action.payload);
      })
      .addCase(thunks.createWard.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Ward
      .addCase(thunks.updateWard.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateWard.fulfilled, (state, action) => {
        state.update= ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateWard.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Ward
      .addCase(thunks.deleteWard.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteWard.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteWard.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createWardReset, updateWardReset, deleteWardReset } =
  wardSlice.actions;
