import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const deliveryTypeSlice = createSlice({
  name: "deliveryTypes",
  initialState: initial,
  reducers: {
    createDeliveryTypeReset: (state) => {
      state.create = initial.create;
    },
    updateDeliveryTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteDeliveryTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Delivery Types
      .addCase(thunks.getDeliveryTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getDeliveryTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getDeliveryTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Delivery Type
      .addCase(thunks.createDeliveryType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createDeliveryType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createDeliveryType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Delivery Type
      .addCase(thunks.updateDeliveryType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateDeliveryType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateDeliveryType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Delivery Type
      .addCase(thunks.deleteDeliveryType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteDeliveryType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDeliveryType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createDeliveryTypeReset,
  updateDeliveryTypeReset,
  deleteDeliveryTypeReset,
} = deliveryTypeSlice.actions;
