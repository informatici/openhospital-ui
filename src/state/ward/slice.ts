import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.allWards.status = "LOADING";
      })
      .addCase(thunks.getWards.fulfilled, (state, action) => {
        state.allWards.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.allWards.data = action.payload;
      })
      .addCase(thunks.getWards.rejected, (state, action) => {
        state.allWards.status = "FAIL";
        state.allWards.error = action.payload;
      })
      // Create Ward
      .addCase(thunks.createWard.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createWard.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createWard.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Ward
      .addCase(thunks.updateWard.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateWard.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateWard.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Ward
      .addCase(thunks.deleteWard.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteWard.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteWard.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const { createWardReset, updateWardReset, deleteWardReset } =
  wardSlice.actions;
