import { createSlice } from "@reduxjs/toolkit";
import { initial } from "./initial";
import * as thunks from "./thunk";
import { ApiResponse } from "state/types";
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
        state.getAll = ApiResponse.loading();
      })
      .addCase(thunks.getOperationTypes.fulfilled, (state, action) => {
        state.getAll = isEmpty(action.payload)
          ? ApiResponse.empty() : ApiResponse.value(action.payload);
      })
      .addCase(thunks.getOperationTypes.rejected, (state, action) => {
        state.getAll = ApiResponse.error(action.payload);
      })
      // Create Operation Type
      .addCase(thunks.createOperationType.pending, (state) => {
        state.create = ApiResponse.loading();
      })
      .addCase(thunks.createOperationType.fulfilled, (state, action) => {
        state.create = ApiResponse.value(action.payload);
      })
      .addCase(thunks.createOperationType.rejected, (state, action) => {
        state.create = ApiResponse.error(action.payload);
      })
      // Update Operation Type
      .addCase(thunks.updateOperationType.pending, (state) => {
        state.update = ApiResponse.loading();
      })
      .addCase(thunks.updateOperationType.fulfilled, (state, action) => {
        state.update = ApiResponse.value(action.payload);
      })
      .addCase(thunks.updateOperationType.rejected, (state, action) => {
        state.update = ApiResponse.error(action.payload);
      })
      // Delete Operation Type
      .addCase(thunks.deleteOperationType.pending, (state) => {
        state.delete = ApiResponse.loading();
      })
      .addCase(thunks.deleteOperationType.fulfilled, (state, action) => {
        state.delete.status = "SUCCESS";
        state.getAll.data = state.getAll.data?.filter((e) => {
          return e.code !== action.payload.code;
        });
      })
      .addCase(thunks.deleteOperationType.rejected, (state, action) => {
        state.delete = ApiResponse.error(action.payload);
      }),
});

export const {
  createOperationTypeReset,
  updateOperationTypeReset,
  deleteOperationTypeReset,
} = operationTypeSlice.actions;
