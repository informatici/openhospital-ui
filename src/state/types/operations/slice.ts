import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const operationTypeSlice = createSlice({
  name: "operationTypes",
  initialState: initial,
  reducers: {
    createOperationTypeReset: (state) => {
      state.create = initial.create;
    },
    updateOperationTypeReset: (state) => {
      state.update = initial.update;
    },
    deleteOperationTypeReset: (state) => {
      state.delete = initial.delete;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Operation Types
      .addCase(thunks.getOperationTypes.pending, (state) => {
        state.getAll.status = "LOADING";
      })
      .addCase(thunks.getOperationTypes.fulfilled, (state, action) => {
        state.getAll.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.getAll.data = action.payload;
      })
      .addCase(thunks.getOperationTypes.rejected, (state, action) => {
        state.getAll.status = "FAIL";
        state.getAll.error = action.payload;
      })
      // Create Operation Type
      .addCase(thunks.createOperationType.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createOperationType.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createOperationType.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Operation Type
      .addCase(thunks.updateOperationType.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateOperationType.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateOperationType.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Operation Type
      .addCase(thunks.deleteOperationType.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteOperationType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteOperationType.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      }),
});

export const {
  createOperationTypeReset,
  updateOperationTypeReset,
  deleteOperationTypeReset,
} = operationTypeSlice.actions;
