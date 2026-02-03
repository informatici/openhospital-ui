import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.operationList = ApiResponse.loading();
      })
      .addCase(thunks.getOperations.fulfilled, (state, action) => {
        state.operationList = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getOperations.rejected, (state, action) => {
        state.operationList = ApiResponse.error(action.payload);
      })
      // Get Operations Rows By Admission
      .addCase(thunks.getOperationsByAdmissionId.pending, (state) => {
        state.operationRowsByQdmt = ApiResponse.loading();
      })
      .addCase(thunks.getOperationsByAdmissionId.fulfilled, (state, action) => {
        state.operationRowsByQdmt = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getOperationsByAdmissionId.rejected, (state, action) => {
        state.operationRowsByQdmt = ApiResponse.error(action.payload);
      })
      // Create Operation
      .addCase(thunks.createOperation.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createOperation.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createOperation.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Operation
      .addCase(thunks.updateOperation.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateOperation.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateOperation.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Operation
      .addCase(thunks.deleteOperation.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteOperation.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
      })
      .addCase(thunks.deleteOperation.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      })
      // Create Operation Row
      .addCase(thunks.createOperationRow.pending, (state) => {
        state.createOperationRow = ApiResponse.loading();
      })
      .addCase(thunks.createOperationRow.fulfilled, (state, action) => {
        state.createOperationRow = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createOperationRow.rejected, (state, action) => {
        state.createOperationRow = ApiResponse.error(action.payload);
      })
      // Update Operation Row
      .addCase(thunks.updateOperationRow.pending, (state) => {
        state.updateOperationRow = ApiResponse.loading();
      })
      .addCase(thunks.updateOperationRow.fulfilled, (state, action) => {
        state.updateOperationRow = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateOperationRow.rejected, (state, action) => {
        state.updateOperationRow = ApiResponse.error(action.payload);
      })
      // Delete Operation Row
      .addCase(thunks.deleteOperationRow.pending, (state) => {
        state.deleteOperationRow = ApiResponse.loading();
      })
      .addCase(thunks.deleteOperationRow.fulfilled, (state, action) => {
        state.deleteOperationRow.status = "SUCCESS";
      })
      .addCase(thunks.deleteOperationRow.rejected, (state, action) => {
        state.deleteOperationRow = ApiResponse.error(action.payload);
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
