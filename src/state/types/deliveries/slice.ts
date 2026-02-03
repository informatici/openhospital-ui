import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getDeliveryTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getDeliveryTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Delivery Type
      .addCase(thunks.createDeliveryType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createDeliveryType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createDeliveryType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Delivery Type
      .addCase(thunks.updateDeliveryType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateDeliveryType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateDeliveryType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Delivery Type
      .addCase(thunks.deleteDeliveryType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteDeliveryType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteDeliveryType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createDeliveryTypeReset,
  updateDeliveryTypeReset,
  deleteDeliveryTypeReset,
} = deliveryTypeSlice.actions;
