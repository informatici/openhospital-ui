import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const dischargeTypeSlice = createSlice({
  name: "dischargeTypes",
  initialState: initial,
  reducers: {
    createDischargeTypeReset: (state) => {
      state.create = initial.create;
    },
    updateDischargeTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteDischargeTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Discharge Types
      .addCase(thunks.getDischargeTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getDischargeTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getDischargeTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Discharge Type
      .addCase(thunks.createDischargeType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createDischargeType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createDischargeType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Discharge Type
      .addCase(thunks.updateDischargeType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateDischargeType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateDischargeType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Discharge Type
      .addCase(thunks.deleteDischargeType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteDischargeType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDischargeType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createDischargeTypeReset,
  updateDischargeTypeReset,
  deleteDischargeTypeReset,
} = dischargeTypeSlice.actions;
