import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

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
        state.supplierList.status = "LOADING";
      })
      .addCase(thunks.getSuppliers.fulfilled, (state, action) => {
        state.supplierList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.supplierList.data = action.payload;
      })
      .addCase(thunks.getSuppliers.rejected, (state, action) => {
        state.supplierList.status = "FAIL";
        state.supplierList.error = action.payload;
      })
      // Create Supplier
      .addCase(thunks.createSupplier.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createSupplier.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createSupplier.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Supplier
      .addCase(thunks.updateSupplier.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateSupplier.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateSupplier.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      }),
});

export const { createSupplierReset, updateSupplierReset, deleteSupplierReset } =
  supplierSlice.actions;
