import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
import { isEmpty } from "lodash";

export const deliveryResultTypeSlice = createSlice({
  name: "deliveryResultTypes",
  initialState: initial,
  reducers: {
    createDeliveryResultTypeReset: (state) => {
      state.create = initial.create;
    },
    updateDeliveryResultTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteDeliveryResultTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Delivery Result Types
      .addCase(thunks.getDeliveryResultTypes.pending, (state) => {
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getDeliveryResultTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDeliveryResultTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Delivery Result Type
      .addCase(thunks.createDeliveryResultType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createDeliveryResultType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createDeliveryResultType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Delivery Result Type
      .addCase(thunks.updateDeliveryResultType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateDeliveryResultType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateDeliveryResultType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Delivery Result Type
      .addCase(thunks.deleteDeliveryResultType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteDeliveryResultType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDeliveryResultType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createDeliveryResultTypeReset,
  updateDeliveryResultTypeReset,
  deleteDeliveryResultTypeReset,
} = deliveryResultTypeSlice.actions;
