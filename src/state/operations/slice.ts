import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { isEmpty } from "lodash";

export const operationSlice = createSlice({
  name: "operations",
  initialState: initial,
  reducers: {
    getOperationsReset: (state) => {
      state.operationList = initial.operationList;
    },
    getOperationsByAdmissionReset: (state) => {
      state.operationRowsByQdmt = initial.operationRowsByQdmt;
    },
    createOperationReset: (state) => {
      state.create = initial.create;
    },
    updateOperationReset: (state) => {
      state.update = initial.update;
    },
    deleteOperationReset: (state) => {
      state.delete = initial.delete;
    },
    createOperationRowReset: (state) => {
      state.createOperationRow = initial.createOperationRow;
    },
    updateOperationRowReset: (state) => {
      state.updateOperationRow = initial.updateOperationRow;
    },
    deleteOperationRowReset: (state) => {
      state.deleteOperationRow = initial.deleteOperationRow;
    },
  },
  extraReducers: (builder) =>
    builder
      // Get Operations
      .addCase(thunks.getOperations.pending, (state) => {
        state.operationList.status = "LOADING";
      })
      .addCase(thunks.getOperations.fulfilled, (state, action) => {
        state.operationList.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.operationList.data = action.payload;
      })
      .addCase(thunks.getOperations.rejected, (state, action) => {
        state.operationList.status = "FAIL";
        state.operationList.error = action.payload;
      })
      // Get Operations Rows By Admission
      .addCase(thunks.getOperationsByAdmissionId.pending, (state) => {
        state.operationRowsByQdmt.status = "LOADING";
      })
      .addCase(thunks.getOperationsByAdmissionId.fulfilled, (state, action) => {
        state.operationRowsByQdmt.status = isEmpty(action.payload)
          ? "SUCCESS_EMPTY"
          : "SUCCESS";
        state.operationRowsByQdmt.data = action.payload;
      })
      .addCase(thunks.getOperationsByAdmissionId.rejected, (state, action) => {
        state.operationRowsByQdmt.status = "FAIL";
        state.operationRowsByQdmt.error = action.payload;
      })
      // Create Operation
      .addCase(thunks.createOperation.pending, (state) => {
        state.create.status = "LOADING";
      })
      .addCase(thunks.createOperation.fulfilled, (state, action) => {
        state.create.status = "SUCCESS";
        state.create.data = action.payload;
      })
      .addCase(thunks.createOperation.rejected, (state, action) => {
        state.create.status = "FAIL";
        state.create.error = action.payload;
      })
      // Update Operation
      .addCase(thunks.updateOperation.pending, (state) => {
        state.update.status = "LOADING";
      })
      .addCase(thunks.updateOperation.fulfilled, (state, action) => {
        state.update.status = "SUCCESS";
        state.update.data = action.payload;
      })
      .addCase(thunks.updateOperation.rejected, (state, action) => {
        state.update.status = "FAIL";
        state.update.error = action.payload;
      })
      // Delete Operation
      .addCase(thunks.deleteOperation.pending, (state) => {
        state.delete.status = "LOADING";
      })
      .addCase(thunks.deleteOperation.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteOperation.rejected, (state, action) => {
        state.delete.status = "FAIL";
        state.delete.error = action.payload;
      })
      // Create Operation Row
      .addCase(thunks.createOperationRow.pending, (state) => {
        state.createOperationRow.status = "LOADING";
      })
      .addCase(thunks.createOperationRow.fulfilled, (state, action) => {
        state.createOperationRow.status = "SUCCESS";
        state.createOperationRow.data = action.payload;
      })
      .addCase(thunks.createOperationRow.rejected, (state, action) => {
        state.createOperationRow.status = "FAIL";
        state.createOperationRow.error = action.payload;
      })
      // Update Operation Row
      .addCase(thunks.updateOperationRow.pending, (state) => {
        state.updateOperationRow.status = "LOADING";
      })
      .addCase(thunks.updateOperationRow.fulfilled, (state, action) => {
        state.updateOperationRow.status = "SUCCESS";
        state.updateOperationRow.data = action.payload;
      })
      .addCase(thunks.updateOperationRow.rejected, (state, action) => {
        state.updateOperationRow.status = "FAIL";
        state.updateOperationRow.error = action.payload;
      })
      // Delete Operation Row
      .addCase(thunks.deleteOperationRow.pending, (state) => {
        state.deleteOperationRow.status = "LOADING";
      })
      .addCase(thunks.deleteOperationRow.fulfilled, (state, action) => {
        state.deleteOperationRow.status = "SUCCESS";
      })
      .addCase(thunks.deleteOperationRow.rejected, (state, action) => {
        state.deleteOperationRow.status = "FAIL";
        state.deleteOperationRow.error = action.payload;
      }),
});

export const {
  getOperationsReset,
  getOperationsByAdmissionReset,
  createOperationReset,
  updateOperationReset,
  deleteOperationReset,
  createOperationRowReset,
  updateOperationRowReset,
  deleteOperationRowReset,
} = operationSlice.actions;
