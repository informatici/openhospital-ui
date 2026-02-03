import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getDischargeTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDischargeTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Discharge Type
      .addCase(thunks.createDischargeType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createDischargeType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createDischargeType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Discharge Type
      .addCase(thunks.updateDischargeType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateDischargeType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateDischargeType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Discharge Type
      .addCase(thunks.deleteDischargeType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteDischargeType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDischargeType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createDischargeTypeReset,
  updateDischargeTypeReset,
  deleteDischargeTypeReset,
} = dischargeTypeSlice.actions;
