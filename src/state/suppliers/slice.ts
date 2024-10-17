import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { ApiResponse } from "state/types";
import { initial } from "./initial";
import * as thunks from "./thunk";

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState: initial,
  reducers: {
    createSupplierReset: (state) => {
      state.create = initial.create;
    },
    updateSupplierReset: (state) => {
      state.update = initial.update;
    },
    deleteSupplierReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Suppliers
      .addCase(thunks.getSuppliers.pending, (state) => {
        state.supplierList = ApiResponse.loading();
      })
      .addCase(thunks.getSuppliers.fulfilled, (state, action) => {
        state.supplierList = isEmpty(action.payload)
          ? ApiResponse.empty()
          : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getSuppliers.rejected, (state, action) => {
        state.supplierList = ApiResponse.error(action.payload);
      })
      // Create Supplier
      .addCase(thunks.createSupplier.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createSupplier.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createSupplier.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Supplier
      .addCase(thunks.updateSupplier.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateSupplier.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateSupplier.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Supplier
      .addCase(thunks.deleteSupplier.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteSupplier.fulfilled, (state, action) => {
        state.delete = ApiResponse.value(action.payload);
      })
      .addCase(thunks.deleteSupplier.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const { createSupplierReset, updateSupplierReset, deleteSupplierReset } =
  supplierSlice.actions;
