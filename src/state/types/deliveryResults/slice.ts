import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
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
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getDeliveryResultTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getDeliveryResultTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Delivery Result Type
      .addCase(thunks.createDeliveryResultType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createDeliveryResultType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createDeliveryResultType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Delivery Result Type
      .addCase(thunks.updateDeliveryResultType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateDeliveryResultType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateDeliveryResultType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Delivery Result Type
      .addCase(thunks.deleteDeliveryResultType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteDeliveryResultType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDeliveryResultType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createDeliveryResultTypeReset,
  updateDeliveryResultTypeReset,
  deleteDeliveryResultTypeReset,
} = deliveryResultTypeSlice.actions;
